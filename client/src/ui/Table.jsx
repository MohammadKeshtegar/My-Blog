import { createContext, useContext } from "react";

const TableContext = createContext();

function Table({ children, columns }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div className="overflow-y-auto h-[650px] custom-scrollbar rounded overflow-hidden">
        <div className={`divider-y-2 w-full text-center`}>{children}</div>
      </div>
    </TableContext.Provider>
  );
}

function Header({ headerTitles, headerStyle }) {
  return (
    <div
      as="header"
      role="row"
      className={`bg-neutral-700 capitalize grid p-3 w-full absolute top-0 ${headerStyle}`}
    >
      {headerTitles.map((title) => (
        <div key={title}>{title}</div>
      ))}
    </div>
  );
}

function Body({ data, bodyStyle, render }) {
  return (
    <section className={`${bodyStyle} divide-y-[1px] divide-neutral-600 mt-12`}>{data.map(render)}</section>
  );
}

function Row({ children, rowStyle, as, role }) {
  const { columns } = useContext(TableContext);

  return (
    <div as={as} role={role} className={`grid grid-cols-${columns} p-3 ${rowStyle} items-center`}>
      {children}
    </div>
  );
}

function Footer({ children, footerStyle }) {
  return <footer className={` rounded-b bg-neutral-700 w-full p-3 ${footerStyle}`}>{children}</footer>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
