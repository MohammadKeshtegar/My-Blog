import Tag from "./Tag";

const filters = [
  { value: "html", label: "Html" },
  { value: "css", label: "Css" },
  { value: "javascript", label: "JavaScript" },
  { value: "react", label: "React" },
  { value: "django", label: "Django" },
  { value: "nodejs", label: "Nodejs" },
];

function Tags() {
  return (
    <>
      {filters.map((filter) => (
        <Tag value={filter.value} key={filter.value}>
          {filter.label}
        </Tag>
      ))}
    </>
  );
}

export default Tags;
