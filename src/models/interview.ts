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

interface InterviewResults {
  id: string;
  vacancy_id: string;
  name: string;
  surname: string;
  resume_link: string;
  tasks: string[];
  solutions: string[];
  chat_history: string[];
  metrics: string[];
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
