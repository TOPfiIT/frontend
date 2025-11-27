interface CreateRoomRequest {
  vacancy_id: string;
  name: string;
  surname: string;
  resume_link: string;
}

interface CreateRoomResponse {
  vacancy: {
    profession: "string";
    position: "string";
  };
  tasks: [
    {
      type: "string";
      condition: "string";
      language: "string";
    }
  ];
  chat: [
    {
      sender: "string";
      content: "string";
    }
  ];
}

interface ResponseValidationError {
  detail: [
    {
      loc: ["string", 0];
      msg: "string";
      type: "string";
    }
  ];
}
