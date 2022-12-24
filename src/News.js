import React, { useState, useEffect } from "react";

const style = {
  Main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  btn: {
    marginRight: "20px",
    borderRadius: "20px",
    width: "100px",
    height: "30px",
    fontSize: "15px",
    fontWeight: "600",
  },
  new_list: {
    display: "flex",
    flexDirection: "column",
    fontSize: "20px",
    width: "auto",
    minWidth: "400px",
  },
  list_detail: {
    display: "flex",
    flexDirection: "column",
    border: "2px solid",
    marginTop: "30px",
    width: "400px",
    paddingLeft: "20px",
    fontSize: "20px",
    borderRadius: "10px",
  },
};
export default function App(props) {
  const [addbtn, setAddbtn] = useState(false);
  const [showbtn, setShowbtn] = useState(false);
  let [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dte, setDte] = useState("");
  const [alert, setAlert] = useState("");
  const [chk, setChk] = useState(true);
  const [bgcolor, setBgcolor] = useState("#ffffff");
  useEffect(() => {
    let presentDate = new Date();
    list.map((item) => {
      let taskdate = new Date(item.Date);
      let year = taskdate.getFullYear() - presentDate.getFullYear();
      let month = taskdate.getMonth() - presentDate.getMonth();
      let testDate = taskdate.getDate() - presentDate.getDate();
      if (year <= 0 && month <= 0 && testDate < 0) {
        item.Date = "Due date passed";
      }
    });
  });

  const btnstyle = {
    backgroundColor: `${bgcolor}`,
    marginRight: "20px",
    borderRadius: "20px",
    width: "100px",
    height: "30px",
    fontSize: "15px",
    fontWeight: "600",
  };

  const Submit = () => {
    if (title !== "" && desc !== "" && dte !== "") {
      let obj = {
        Id: list.length + 1,
        Title: title,
        Desc: desc,
        Date: dte,
        check: false,
      };
      setList([...list, obj]);
      setDesc("");
      setDte("");
      setTitle("");
      setAlert("");
    } else {
      setAlert("Please Enter all details !");
    }
  };
  const oncheck = (e) => {
    const Id = e - 1;
    setChk(!chk);
    if (chk) {
      setList(
        (list = [
          ...list.slice(0, Id),
          { ...list[Id], ["check"]: true },
          ...list.slice(Id + 1),
        ])
      );
    } else {
      setList(
        (list = [
          ...list.slice(0, Id),
          { ...list[Id], ["check"]: false },
          ...list.slice(Id + 1),
        ])
      );
    }
  };

  const Deletelist = (value) => {
    setList([...list.slice(0, value - 1), ...list.slice(value)]);
  };

  return (
    <div style={style.Main}>
      <div>
        <h1 style={{ color: "red" }}>ToDo Application</h1>
      </div>
      <div>
        <button
          style={btnstyle}
          id="btn1"
          onClick={() => [setShowbtn(false), setAddbtn(true)]}
          onMouseOver={() => setBgcolor("cyan")}
          onMouseOut={() => setBgcolor("#ffffff")}
        >
          Newlist
        </button>

        <button
          style={style.btn}
          onClick={() => [setShowbtn(true), setAddbtn(false)]}
        >
          Todo List
        </button>
      </div>

      {addbtn && (
        <div style={style.new_list}>
          <label>Title :</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Description :</label>
          <textarea
            value={desc}
            style={{ height: "100px" }}
            onChange={(e) => setDesc(e.target.value)}
          />
          <label>Date :</label>{" "}
          <input
            type="date"
            style={{ width: "100px" }}
            value={dte}
            onChange={(e) => setDte(e.target.value)}
          />
          <br />
          <span>{alert}</span>
          <button
            style={{ width: "100px", marginLeft: "auto" }}
            onClick={() => Submit()}
          >
            Add
          </button>
        </div>
      )}

      {showbtn &&
        list.map((item) => (
          <div
            style={{
              ...style.list_detail,
              ...(list[item.Id - 1].Date === "Due date passed"
                ? { border: "2px solid yellow" }
                : { border: "2px solid" }),
            }}
            key={item.Id}
          >
            <span>
              <input
                type="checkbox"
                style={{ marginRight: "20px" }}
                onChange={() => oncheck(item.Id)}
              />
              <label
                data-title="title"
                style={
                  list[item.Id - 1].check === true
                    ? { textDecorationLine: "line-through" }
                    : { textDecorationLine: "none" }
                }
              >
                {item.Title}
              </label>
            </span>
            <span
              data-description="desc"
              style={
                list[item.Id - 1].check === true
                  ? { textDecorationLine: "line-through" }
                  : { textDecorationLine: "none" }
              }
              className="list"
            >
              {item.Desc}
            </span>{" "}
            <br />
            <label style={{ marginBottom: "-20px" }} className="list1">
              Last date is :{item.Date}
              {alert}
            </label>
            <button
              style={{
                width: "80px",
                marginLeft: "auto",
                marginRight: "50px",
                marginBottom: "20px",
              }}
              onClick={() => Deletelist(item.Id)}
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
}
