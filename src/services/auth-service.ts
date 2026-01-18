import { sql } from "../db";

export async function signUpService(user: any) {
  try {
    // ตรวจสอบว่าอีเมลมีอยู่แล้วหรือไม่
    const [existingUser] =
      await sql`SELECT id FROM users WHERE email = ${user.email} LIMIT 1`;
    if (existingUser) {
      return { success: false, message: "Email is already registered" };
    }

    // แฮชรหัสผ่าน
    const passwordHashed = await Bun.password.hash(user.password);

    // เพิ่มข้อมูลลงฐานข้อมูล
    await sql`
            INSERT INTO users (fullname, email, password)
            VALUES (${user.fullName}, ${user.email}, ${passwordHashed})
            RETURNING id
        `;

    return { success: true, message: "ลงทะเบียนสำเร็จ" };
  } catch (error) {
    console.error("Error in signUp:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}

export async function signInService(email: string, password: string) {
  try {
    // ดึงข้อมูล user จาก database โดยใช้ email
    const [user] =
      await sql`SELECT id, password FROM users WHERE email = ${email} LIMIT 1`;

    // ถ้าไม่พบ user ให้ return false
    if (!user) {
      return { success: false, message: "Invalid email or password 1" };
    }

    // ตรวจสอบ password โดยเปรียบเทียบกับ hash ที่เก็บไว้
    const isMatch = await Bun.password.verify(password, user.password);

    if (!isMatch) {
      return { success: false, message: "Invalid email or password 2" };
    }

    return { success: true, id: user.id };
  } catch (error) {
    console.error("Error in signIn:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}

export async function getProfileService(id: number) {
  try {
    // ดึงข้อมูลผู้ใช้จาก database
    const [user] = await sql`
            SELECT id, fullname, email FROM users WHERE id = ${id} LIMIT 1
        `;

    // ถ้าไม่พบ user ให้ return ข้อความแจ้งเตือน
    if (!user) {
      return { success: false, message: "User not found" };
    }

    return { success: true, profile: user };
  } catch (error) {
    console.error("Error in getProfile:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}
