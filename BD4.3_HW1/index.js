//npm install sqlite3 sqlite
//node BD4.3_HW1/initDB.js
const { Console } = require("console");
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "./BD4.3_HW1/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.3_HW1" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/*
Exercise 1: Fetch All Employees by Gender

Create an endpoint /employees/gender/:gender to return all employees of a specific gender.

Create a function filterByGender to fetch employees filtered by gender from the database.

Wrap the function call in a try-catch block.

Ensure that errors are caught and return res.status(500).json({ error: error.message }) if anything goes wrong.

Return 404 error if no data is found.

API Call:

<http://localhost:3000/employees/gender/female>


Expected Response:

{
  employees: [
    {
      id: 2,
      name: 'Jane Smith',
      gender: 'female',
      department: 'Engineering',
      job_title: 'QA Engineer',
      location: 'Austin',
    },
    {
      id: 4,
      name: 'Emily Davis',
      gender: 'female',
      department: 'Marketing',
      job_title: 'Marketing Specialist',
      location: 'Chicago',
    },
    {
      id: 6,
      name: 'Sarah Wilson',
      gender: 'female',
      department: 'Engineering',
      job_title: 'DevOps Engineer',
      location: 'Seattle',
    },
    {
      id: 8,
      name: 'Laura Thompson',
      gender: 'female',
      department: 'Engineering',
      job_title: 'Software Engineer',
      location: 'Austin',
    },
    {
      id: 10,
      name: 'Linda Lewis',
      gender: 'female',
      department: 'Sales',
      job_title: 'Sales Representative',
      location: 'San Francisco',
    },
  ],
}
*/

// function to fetch employees filtered by gender from the database
async function filterByGender(gender) {
  let query = `SELECT * FROM employees WHERE gender = ?`;
  try {
    if (!db) {
      throw new Error("Database not connected");
    }
    let result = await db.all(query, [gender]);
    if (!result || result.length === 0) {
      console.log("No data found of gender : " + gender);
      throw new Error("No data found of gender : " + gender);
    }
    return { employees: result };
  } catch (error) {
    console.log("Error in fetching employees : " + error.message);
    throw error;
  }
}

// Endpoint to fetch all employees by gender
app.get("/employees/gender/:gender", async (req, res) => {
  try {
    let gender = req.params.gender;
    let result = await filterByGender(gender);
    console.log("Succesfully fetched all employees of gender : " + gender);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "No data found of gender : " + gender) {
      return res.status(404).json({ status: 404, error: error.message });
    } else {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
});

/*
Exercise 2: Fetch All Employees by Department

Create an endpoint /employees/department/:department to return all employees of a specific department.

Create a function filterByDepartment to fetch employees filtered by department from the database.

Wrap the function call in a try-catch block.

Ensure that errors are caught and return res.status(500).json({ error: error.message }) if anything goes wrong.

Return 404 error if no data is found.

API Call:

<http://localhost:3000/employees/department/Engineering>


Expected Response:

{
  employees: [
    {
      id: 1,
      name: 'John Doe',
      gender: 'male',
      department: 'Engineering',
      job_title: 'Software Engineer',
      location: 'New York',
    },
    {
      id: 2,
      name: 'Jane Smith',
      gender: 'female',
      department: 'Engineering',
      job_title: 'QA Engineer',
      location: 'Austin',
    },
    {
      id: 6,
      name: 'Sarah Wilson',
      gender: 'female',
      department: 'Engineering',
      job_title: 'DevOps Engineer',
      location: 'Seattle',
    },
    {
      id: 8,
      name: 'Laura Thompson',
      gender: 'female',
      department: 'Engineering',
      job_title: 'Software Engineer',
      location: 'Austin',
    },
  ],
}
*/

// function to fetch employees filtered by department from the database
async function filterByDepartment(department) {
  let query = `SELECT * FROM employees WHERE department = ?`;
  try {
    if (!db) {
      throw new Error("Database not connected");
    }
    let result = await db.all(query, [department]);
    if (!result || result.length === 0) {
      console.log("No data found of department : " + department);
      throw new Error("No data found of department : " + department);
    }
    return { employees: result };
  } catch (error) {
    console.log("Error in fetching employees : " + error.message);
    throw error;
  }
}

// Endpoint to fetch all employees by department
app.get("/employees/department/:department", async (req, res) => {
  try {
    let department = req.params.department;
    let result = await filterByDepartment(department);
    console.log(
      "Succesfully fetched all employees of department : " + department,
    );
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "No data found of department : " + department) {
      return res.status(404).json({ status: 404, error: error.message });
    } else {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
});

/*
Exercise 3: Fetch All Employees by Job Title

Create an endpoint /employees/job_title/:job_title to return all employees of a specific job title.

Create a function filterByJobTitle to fetch employees filtered by job title from the database.

Wrap the function call in a try-catch block.

Ensure that errors are caught and return res.status(500).json({ error: error.message }) if anything goes wrong.

Return 404 error if no data is found.

API Call:

<http://localhost:3000/employees/job_title/Software%20Engineer>


Expected Response:

{
  employees: [
    {
      id: 1,
      name: 'John Doe',
      gender: 'male',
      department: 'Engineering',
      job_title: 'Software Engineer',
      location: 'New York',
    },
    {
      id: 8,
      name: 'Laura Thompson',
      gender: 'female',
      department: 'Engineering',
      job_title: 'Software Engineer',
      location: 'Austin',
    },
  ],
}

*/

// function to fetch employees filtered by job title from the database
async function filterByJobTitle(job_title) {
  let query = `SELECT * FROM employees WHERE job_title = ?`;
  try {
    if (!db) {
      throw new Error("Database not connected");
    }
    let result = await db.all(query, [job_title]);
    if (!result || result.length === 0) {
      console.log("No data found of job title : " + job_title);
      throw new Error("No data found of job title : " + job_title);
    }
    return { employees: result };
  } catch (error) {
    console.log("Error in fetching employees : " + error.message);
    throw error;
  }
}

// Endpoint to fetch all employees by job title
app.get("/employees/job_title/:job_title", async (req, res) => {
  try {
    let job_title = req.params.job_title;
    let result = await filterByJobTitle(job_title);
    console.log(
      "Succesfully fetched all employees of job title : " + job_title,
    );
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "No data found of job title : " + job_title) {
      return res.status(404).json({ status: 404, error: error.message });
    } else {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
});

/*
Exercise 4: Fetch All Employees by Location

Create an endpoint /employees/location/:location to return all employees of a specific location.

Create a function filterByLocation to fetch employees filtered by location from the database.

Wrap the function call in a try-catch block.

Ensure that errors are caught and return res.status(500).json({ error: error.message }) if anything goes wrong.

Return 404 error if no data is found.

API Call:

<http://localhost:3000/employees/location/New%20York>


Expected Response:

{
  employees: [
    {
      id: 1,
      name: 'John Doe',
      gender: 'male',
      department: 'Engineering',
      job_title: 'Software Engineer',
      location: 'New York',
    },
    {
      id: 5,
      name: 'Michael Johnson',
      gender: 'male',
      department: 'HR',
      job_title: 'HR Manager',
      location: 'New York',
    },
    {
      id: 9,
      name: 'Robert White',
      gender: 'male',
      department: 'Support',
      job_title: 'Support Specialist',
      location: 'New York',
    },
  ],
}

*/

// function to fetch employees filtered by location from the database
async function filterByLocation(location) {
  let query = `SELECT * FROM employees WHERE location = ?`;
  try {
    if (!db) {
      throw new Error("Database not connected");
    }
    let result = await db.all(query, [location]);
    if (!result || result.length === 0) {
      console.log("No data found of location : " + location);
      throw new Error("No data found of location : " + location);
    }
    return { employees: result };
  } catch (error) {
    console.log("Error in fetching employees : " + error.message);
    throw error;
  }
}

// Endpoint to fetch all employees by location
app.get("/employees/location/:location", async (req, res) => {
  try {
    let location = req.params.location;
    let result = await filterByLocation(location);
    console.log("Succesfully fetched all employees of location : " + location);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "No data found of location : " + location) {
      return res.status(404).json({ status: 404, error: error.message });
    } else {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
});
