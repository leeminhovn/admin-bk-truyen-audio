// Trong Table.js
import Image from "next/image";
import styles from "./NormalTableStyle.module.scss";
import loadingIcon from "@/../public/assets/animations/loading_button_image.svg";

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
const TableBody = ({ columns, data, onClickRow = () => {} }) => (
  <tbody>
    {data.map((row, rowIndex) => (
      <tr onClick={() => onClickRow(row)} key={rowIndex}>
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
export default function NormalTable({
  columns,
  data,
  isLoading,
  onClickRow = () => {},
}) {
  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <TableHeader columns={columns} />

        <TableBody onClickRow={onClickRow} columns={columns} data={data} />
      </table>
      {isLoading && (
        <div className={styles.isLoading}>
          <Image src={loadingIcon} alt="loading" />
        </div>
      )}
      {!isLoading && data.length === 0 && (
        <div className={styles.notFoundData}>
          <b>Not found data</b>
        </div>
      )}
    </div>
  );
}
