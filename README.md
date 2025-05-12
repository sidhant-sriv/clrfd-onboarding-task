# Clearfeed Onboarding Task

## Task Description

Create a project with the following features:

### Database Setup
Create 2 new tables using Sequelize migrations:
- **Accounts**
  - `id`: int, primary key, auto increment
  - `name`: string
  - `created_at`, `updated_at`, `deleted_at`: DateTime format

- **Settings**
  - `id`: int, primary key, auto increment
  - `name`: string
  - `data_type`: enum ('string', 'number', 'boolean', 'json')
  - `account_id`: foreign key pointing to accounts
  - `value`: string
  - `created_at`, `updated_at`, `deleted_at`: DateTime format

### Required APIs
1. **Account Creation API**
   - Insert a record in accounts table
   - Enforce unique account names

2. **Settings Management APIs**
   - Create, update and delete settings
   - Validate values against the specified data_type
   - Example setting:
     ```
     id: 1
     name: ENABLE_ACCOUNT_CREATION
     value: "true" (stored as string)
     account_id: 10
     ```

3. **Authentication**
   - Implement basic authentication for the settings API

### Time Limit
- 2 days for implementation
- Check in with your manager/mentor after day 1

### Submission
Submit your work as a pull request against an empty branch (not directly to main/master) for easier review.
