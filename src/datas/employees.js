import { faker } from "@faker-js/faker";

export function generateEmployeeList(count) {
  const employees = [];
  for (let i = 0; i < count; i++) {
    const employee = {
      id: i + 1,
      avatar: faker.image.avatar(),
      birthday: faker.date.birthdate(),
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      sex: faker.person.sexType(),
    };
    employees.push(employee);
  }
  return employees;
}

export const changeEmployeeName = (employee) => {
  return {
    ...employee,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  };
};

// 生成 10 個假的員工
export const employeeList = generateEmployeeList(3);
