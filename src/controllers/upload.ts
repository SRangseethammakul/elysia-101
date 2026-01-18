import { Elysia, t } from "elysia";

const uploadController = new Elysia()
  .onRequest(() => {
    console.log("On request");
  })
  .on("beforeHandle", () => {
    console.log("Before handle");
  })
  .post(
    "/upload",
    async ({ body }) => {
      //   console.log(body.file);
      const newFileName = `upload_${Bun.randomUUIDv7()}.${body.file.type?.split("/")[1]}`;
      const fullPath = `./public/${newFileName}`;
      await Bun.write(fullPath, body.file);
      return {
        message: "File uploaded successfully",
        url: `http://localhost:3000/api/images/${newFileName}`,
      };
    },
    {
      body: t.Object({
        file: t.File({ format: "image/*" }),
      }),
    },
  );
export default uploadController;
