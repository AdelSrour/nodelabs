const users = [
  { name: "John Doe", age: 28, role: "developer" },
  { name: "Jane Smith", age: 32, role: "admin" },
  { name: "Bob Johnson", age: 24, role: "developer" },
  { name: "Sarah Williams", age: 27, role: "manager" },
  { name: "Mike Brown", age: 35, role: "admin" },
];

//Q1
const above30 = users.filter((user) => user.age > 30);
console.log("Users above 30 ", above30);

//Q2
const names = users.map((user) => user.name);
console.log("Usernames ", names);

//Q3
const firstAdmin = users.find((user) => user.role === "admin");
console.log("First Admin ", firstAdmin);

//Q4
const lastAdmin = users.findLast((user) => user.role === "admin");
console.log("Last Admin ", lastAdmin);

//Q5
function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
let users2 = deepCopy(users);
