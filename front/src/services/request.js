import axios from "axios";
const url = "http://localhost:3030/api/pages";
const headers = {
  "Content-Type": "application/json",
};

const checkPathName = (functionName, pathName) => {
  if (!(pathName && typeof pathName === "string")) {
    console.error("Request::" + functionName + ": pathName error");
  }
};

const checkContent = (functionName, content) => {
  if (typeof content !== "string") {
    console.error("Request::" + functionName + ": content error");
  }
};

export class Request {
  async getPage(pathName) {
    checkPathName("getPage", pathName);
    return await axios.get(url + pathName);
  }

  async createPage(pathName, content) {
    checkPathName("createPage", pathName);
    checkContent("createPage", content);
    return await axios.post(
      url,
      {
        path: pathName,
        content,
      },
      {
        headers,
      }
    );
  }

  async editPage(pathName, content) {
    checkPathName("editPage", pathName);
    checkContent("editPage", content);

    return await axios.patch(
      url + pathName,
      {
        content,
        updated_at: new Date().getTime(),
      },
      {
        headers,
      }
    );
  }
}