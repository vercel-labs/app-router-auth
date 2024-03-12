import { insertUser } from "@/be/db"
import { NewUser } from "@/be/schema"

async function main() {
  const newUser: NewUser = {
    name: "user",
    email: "user@example.com",
    password: "123456",
  }
  const res = await insertUser(newUser)
  console.log("Sucessfully seeded users table:", res)
  process.exit()
}

main()
