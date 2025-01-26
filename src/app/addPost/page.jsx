import { addPost } from "@/lib/action";
import React from "react";

const page = () => {
  return (
    <div>
      <form action={addPost}>
        <input type="text" placeholder="title" name="title" />
        <input type="text" placeholder="desc" name="desc" />
        <input type="text" placeholder="userId" name="userId" />
        <input type="text" placeholder="slug" name="slug" />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default page;
