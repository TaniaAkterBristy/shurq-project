import { v4 as uuidv4 } from "uuid";
import bigquery from "./bigQueryClient";

function getRegionID(region_id) {
  if (region_id === "na") return 1;
  if (region_id === "eu") return 2;
  if (region_id === "sg") return 3;
  if (region_id === "au") return 4;
  if (region_id === "fe") return 5;
  if (region_id === "sa") return 6;
}

async function checkUserExist({ id, email, tableId }) {
  const datasetId = "users";

  try {
    const userQuery = `
      SELECT *
      FROM ${datasetId}.${"user_accounts"}
      WHERE email = @email  
    `;

    const userOption = {
      query: userQuery,
      params: {
        email,
      },
    };

    const verifiedQuery = `
      SELECT *
      FROM ${datasetId}.${"verified_accounts"}
      WHERE id = @id
    `;

    const verifiedOption = {
      query: verifiedQuery,
      params: {
        id,
      },
    };

    const queryToPass =
      tableId === "verified_accounts" ? verifiedOption : userOption;

    const [checkResult] = await bigquery.query(queryToPass);

    if (checkResult.length > 0) {
      return { status: 200, data: checkResult[0] };
    }
    return { status: 404, data: null };
  } catch (error) {
    console.error("Error finding user:", error);
    return { status: 500, data: null };
  }
}

// get next id

async function getNextId() {
  const datasetId = "users";
  const tableId = "user_accounts";

  // Query to count the number of rows in the table
  const query = `SELECT COUNT(*) as rowCount FROM ${datasetId}.${tableId}`;
  const options = {
    query: query,
    location: "US", // Specify your location
  };

  // Run the query
  const [job] = await bigquery.createQueryJob(options);
  const [rows] = await job.getQueryResults();

  const currentRowCount = parseInt(rows[0].rowCount, 10);
  console.log("current no of records:", currentRowCount);
  const nextId = currentRowCount + 1;
  console.log("next Id:", nextId);
  return nextId;
}

async function insertData({ firstname, lastname, username, password, email }) {
  // const uniqueId = uuidv4();
  const uniqueId = await getNextId();
  console.log("id:", uniqueId);
  const datasetId = "users";
  const tableId = "user_accounts";
  const dateNow = new Date();
  const data = [
    {
      id: uniqueId,
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      status: "pending",
      email: email,
      email_verified: 0,
      created_at:
        dateNow.getFullYear() +
        "-" +
        String(dateNow.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(dateNow.getDate()).padStart(2, "0"),
      deleted_at: "",
    },
  ];

  try {
    // checking user already registered
    const query = `
      SELECT *
      FROM ${datasetId}.${tableId}
      WHERE email = @email OR username = @username
    `;

    const options = {
      query: query,
      location: "US",
      params: { email: email, username: username },
    };

    const [rows] = await bigquery.query(options);
    if (rows.length > 0) {
      return { status: 409, error: "Username or email already exists.." };
    }

    const user = await bigquery.dataset(datasetId).table(tableId).insert(data);
    console.log("user created:::", user);
    return { status: 200, message: "Successfully Signed up",user:user };
  } catch (error) {
    if (error?.errors[0]?.errors) {
      console.error("Error inserting data:", error.errors[0].errors);
    } else if (error?.errors[0]?.message) {
      console.error("Error inserting data:", error.errors[0].message);
    } else {
      console.error("Error inserting data:", error);
    }
    return { status: 500, error: error.message };
  }
}

async function getData({ email, password }) {
  const datasetId = "users";
  const tableId = "user_accounts";

  try {
    const userExistInUserAccounts = await checkUserExist({
      id: "",
      email,
      tableId,
    });
    console.log("use existence obj:", userExistInUserAccounts);
    // check its registered or not
    if (userExistInUserAccounts.status === 200) {
      const { data } = userExistInUserAccounts;

      // verified account user exists or not
      const userExistVerifiedAccounts = await checkUserExist({
        id: data.id,
        email: "",
        tableId: "verified_accounts",
      });
      console.log("user in verified account", userExistVerifiedAccounts);
      if (userExistVerifiedAccounts.status === 200) {
        const hashedPassword = data.password;

        // comparing the passwords
        const response = await fetch(
          `${process.env.APP_URL}/api/compare-password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              hashedPassword: hashedPassword,
              password: password,
            }),
          }
        );
        const match = await response.json();

        if (match) {
          return { data: data, status: 200 };
        } else {
          return { status: 401, error: "Invalid email or password" };
        }
      } else if (userExistVerifiedAccounts.status === 404) {
        return {
          status: 403,
          error: "Email not verified...",
        };
      }
    }

    return { status: 404 };
  } catch (error) {
    return { status: 500, error: error };
  }
}
async function finUserWithEmail({ email }) {
  const datasetId = "users";
  const tableId = "user_accounts";
  // query
  const query = `
    SELECT *
    FROM ${datasetId}.${tableId} 
    WHERE email = @email  
  `;

  const options = {
    query: query,
    location: "US",
    params: { email: email },
  };

  try {
    console.log("find user with email data .....");
    const [rows] = await bigquery.query(options);
    console.log("rows:", rows);
    if (rows.length > 0) {
      const verify = rows[0].email_verified;
      return { data: rows, status: 200 };
    }
    return { status: 404 };
  } catch (error) {
    return { status: 500, error: error };
  }
}

async function updatePasswordInBQ({ email, oldPassword, newPassword }) {
  const datasetId = "users";
  const tableId = "user_accounts";
  try {
    console.log("passwords coming:", oldPassword, newPassword);
    const checkQuery = `
    SELECT *
    FROM ${datasetId}.${tableId}
    WHERE email = @email
  `;

    const checkOptions = {
      query: checkQuery,
      params: {
        email,
      },
    };

    const [checkResult] = await bigquery.query(checkOptions);

    if (checkResult.length > 0) {
      const { password: savedPassword } = checkResult[0];
      const response = await fetch(
        `${process.env.APP_URL}/api/compare-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hashedPassword: savedPassword,
            password: oldPassword,
          }),
        }
      );
      const isValid = await response.json();

      if (isValid) {
        const response = await fetch(
          `${process.env.APP_URL}/api/hash-password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password: newPassword,
            }),
          }
        );
        const newHashedPassword = await response.json();

        const updateQuery = `
  UPDATE ${datasetId}.${tableId}
  SET password = @newHashedPassword
  WHERE email = @email
 `;

        const updateOptions = {
          query: updateQuery,
          params: {
            newHashedPassword,
            email,
          },
        };

        const updatedRecord = await bigquery.query(updateOptions);

        // console.log(`Updated status for email: ${email}`);
        return { data: updatedRecord, status: 200 };
      }
      return { status: 401 };
    }
  } catch (error) {
    console.log("error in bg function cannot update:", error);
    return { status: 500 };
  }
}

async function updateVerificationStatus({ email }) {
  const tableId = "user_accounts";

  try {
    // Check if the email exists in the table
    const userExist = await checkUserExist({ email, tableId, id: "" });

    // If the email exists and is not in the streaming buffer, update the verification status
    if (userExist.status === 200) {
      const { id, created_at, deleted_at } = userExist.data;
      const userExistInVerified = await checkUserExist({
        id,
        email: "",
        tableId: "verified_accounts",
      });
      if (userExistInVerified.status === 404) {
        const verified = await insertVerifiedUsers({
          id,
          deleted_at,
          created_at,
        });
        console.log("", verified);
        return verified;
      } else if (userExistInVerified.status === 200) {
        return { status: 200, message: "user already verified" };
      } else {
        return { status: 500, message: "unexpected error.." };
      }
    }

    console.log(`Email not found : ${email}`);
    return { status: 404 };
  } catch (error) {
    console.error("Error updating status:", error);
    return { status: 500 };
  }
}

async function insertVerifiedUsers({ id, created_at, deleted_at }) {
  const datasetId = "users";
  const tableId = "verified_accounts";

  const data = [
    {
      id: id,
      email_verified: 1,
      created_at: created_at,
      deleted_at: deleted_at,
    },
  ];

  try {
    // checking user already registered
    const query = `
    SELECT * 
    FROM ${datasetId}.${tableId} 
    WHERE id = @id
  `;

    const options = {
      query: query,
      location: "US",
      params: { id: id },
    };

    const [rows] = await bigquery.query(options);
    if (rows.length > 0) {
      return { status: 409, error: "Username already verified ..." };
    }

    const user = await bigquery.dataset(datasetId).table(tableId).insert(data);
    console.log("verified user:::", user);
    return { status: 200, message: "You are Successfully Verified!" };
  } catch (error) {
    if (error?.errors[0]?.errors) {
      console.error(
        "Error inserting data in verified users:",
        error.errors[0].errors
      );
    } else if (error?.errors[0]?.message) {
      console.error(
        "Error inserting data  in verified users:",
        error.errors[0].message
      );
    } else {
      console.error("Error inserting data  in verified users:", error);
    }
    return { status: 500, error: error.message };
  }
}

async function resetPassword({ email, password }) {
  const datasetId = "users";
  const tableId = "user_accounts";
  try {
    const response = await fetch(`${process.env.APP_URL}/api/hash-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
      }),
    });
    const hashedPassword = await response.json();
    const updateQuery = `
  UPDATE ${datasetId}.${tableId}
  SET password = @hashedPassword
  WHERE email = @email
 `;

    const updateOptions = {
      query: updateQuery,
      params: {
        hashedPassword,
        email,
      },
    };

    const updatedRecord = await bigquery.query(updateOptions);
    return { data: updatedRecord, status: 200 };
  } catch (error) {
    console.log("error in bg function cannot update:", error);
    return { status: 500 };
  }
}

export {
  insertData,
  getData,
  finUserWithEmail,
  updateVerificationStatus,
  updatePasswordInBQ,
  getNextId,
  resetPassword,
  checkUserExist,
};
