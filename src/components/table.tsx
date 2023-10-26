import { Table } from 'react-bootstrap';
import Link from 'next/link';
import { ButtonComponent } from '@/components/button';
import { EyeFill, PencilFill, Trash2Fill } from 'react-bootstrap-icons';

const TableComponent = ({ data, columns, onClickView, onClickEdit, onClickDelete, LinkView, LinkEdit }: any) => {
    return (
        data.length > 0 ?
        <Table bordered>
            <thead>
                <tr>
                    <th>#</th>
                    {columns.map((column: any, index: any) => (
                        <th key={index}>{column.name}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row: any, rowIndex: any) => {
                    <tr key={rowIndex}>
                        {columns.map((column: any) =>
                            <td key={column.key}>{row[column.key]}</td>
                        )}
                        <td>
                            <Link href={LinkView}>
                                <ButtonComponent content={<EyeFill></EyeFill>}
                                    type={'primary'} action={onClickView} css={''}></ButtonComponent>
                            </Link>
                            <Link href={{ pathname: LinkEdit, query: { id: row.uuid } }}>
                                <ButtonComponent content={<PencilFill></PencilFill>}
                                    type={'warning'} action={onClickEdit} css={'ml-1'}></ButtonComponent>
                            </Link>
                            <ButtonComponent content={<Trash2Fill></Trash2Fill>}
                                type={'danger'} action={onClickDelete} css={'ml-1'}></ButtonComponent>

                        </td>
                    </tr>
                })
                }
            </tbody>
        </Table> : <div className='text-center w-100'>No results found</div>
    )
}

export default TableComponent;