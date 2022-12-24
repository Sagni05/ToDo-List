import ClearIcon from "@mui/icons-material/Clear";


const List = (props) => {
  return (
    <>
      <div className="libox">
        <li>
          <button
            className="icon"
            onClick={() => {
              props.onselect(props.id);
            }}
          >
            <ClearIcon style={{ fontSize: "20px" }} />{" "}
          </button>{" "}
          {props.text}
        </li>
      </div>
    </>
  );
};
export default List;
