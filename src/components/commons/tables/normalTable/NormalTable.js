// Trong Table.js
import CardWrapLayout from "../../cardsWrap/cardWrapLayout/CardWrapLayout";
import styles from "./NormalTableStyle.module.scss";

// Component cho Header của Table
const TableHeader = ({ columns }) => (
  <thead>
    <tr>
      {columns.map((column, index) => (
        <th className={styles.th} key={index} style={{ width: column.width }}>
          {column.header}
        </th>
      ))}
    </tr>
  </thead>
);

// Component cho Body của Table
const TableBody = ({ columns, data }) => (
  <tbody>
    {data.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {columns.map((column, columnIndex) => (
          <td className={styles.td} key={columnIndex}>
            {row[column.field]}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);

// Component Table chính
export default function NormalTable({ columns, data, isLoading }) {
  return (
    <table className={styles.table}>
      <TableHeader columns={columns} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <TableBody columns={columns} data={data} />
      )}
    </table>
  );
}
