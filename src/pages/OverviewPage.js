import React from 'react'
import { useTable } from 'react-table';
import { Proxy } from '../Proxy.js';
import { Command } from '../Command.js'





function OverviewPage(){



    var proxy = new Proxy()
    //var item_data = new Command('GET','','user')
    //var action_data = new Command('GET','','action')
    //var project_data = new Command('GET','','project')
    var item_data = [
        {
            "title": "This is an action",
            "itemId": 3,
            "added": "2021-08-09T19:56:47Z",
            "lastAccessed": "2021-08-09T19:56:47Z",
            "parentID": null,
            "deadline": "2021-08-09T19:56:47Z",
            "category": "None"
        },
        {
            "title": "This is an action",
            "itemId": 4,
            "added": "2021-08-09T19:56:47Z",
            "lastAccessed": "2021-08-09T19:56:47Z",
            "parentID": null,
            "deadline": "2021-08-09T19:56:47Z",
            "category": "None"
        }
    ]
    var action_data = [
        {
            "title": "This is an action",
            "itemId": 3,
            "added": "2021-08-09T19:56:47Z",
            "lastAccessed": "2021-08-09T19:56:47Z",
            "parentID": null,
            "deadline": "2021-08-09T19:56:47Z",
            "category": "None"
        },
        {
            "title": "This is an action",
            "itemId": 4,
            "added": "2021-08-09T19:56:47Z",
            "lastAccessed": "2021-08-09T19:56:47Z",
            "parentID": null,
            "deadline": "2021-08-09T19:56:47Z",
            "category": "None"
        }
    ]

    var project_data = [
        {
            "title": "This is an action",
            "itemId": 3,
            "added": "2021-08-09T19:56:47Z",
            "lastAccessed": "2021-08-09T19:56:47Z",
            "parentID": null,
            "deadline": "2021-08-09T19:56:47Z",
            "category": "None"
        },
        {
            "title": "This is an action",
            "itemId": 4,
            "added": "2021-08-09T19:56:47Z",
            "lastAccessed": "2021-08-09T19:56:47Z",
            "parentID": null,
            "deadline": "2021-08-09T19:56:47Z",
            "category": "None"
        }
    ]

    var data_to_add = [];
    for (let i = 0; i < project_data.length; i++) {

          
        data_to_add.push( {
            project: project_data[i].title,
            action: action_data[i].title,
            item: item_data[i].title,
          })
    }

    const data = React.useMemo(() =>data_to_add
 ,
    []
   )
   console.log(`object 2: ${data} `)

 
 

         
   const columns = React.useMemo(
       () => [
       {
       Header: 'Project Header',
       columns: [
       {
       Header: 'Project',
       accessor: 'project',
       },
       {
        Header: 'Item',
        accessor: 'item',
        },
       {
       Header: 'Action',
       accessor: 'action',
       },

       ],
       },
       ],
       []
      )
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
       } = useTable({ columns, data })

    return(
        <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
}

export default OverviewPage