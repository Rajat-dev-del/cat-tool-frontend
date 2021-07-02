import React,  { useEffect , useState}   from 'react'
import Table from 'react-bootstrap/Table'
import { GrNext, GrPrevious } from "react-icons/gr";


 const TranslationTable = (props) => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isActiveRow, setIsActiveRow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [textInput, setTextInput] = useState("");
  
  console.log(rowsPerPage)

  useEffect(() => {
    const getData = () => {
      fetch("http://localhost:4003/employees", {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json '
        }
      }).then((response) => {
        response.json().then((result) => {
          setData(result.rows)
          // console.log(result.rows);
        })
      })
    }

    getData();
  }, []);


  const isActive = () => {
    setIsActiveRow(!isActiveRow)
  }


  // Get current postssetCurrentPage
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRow = data.slice(indexOfFirstRow, indexOfLastRow);

  // console.log("current row - " + currentRow);
  // console.log(data)

  const pageNumbers = [];
  const totalRows = data.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage)

  // console.log("row per page is :", rowsPerPage)
  // console.log("total row is :", totalRows)


  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  //change page 
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  // console.log(paginate)


  let previous = () => {
    if (currentPage < totalRows && currentPage > 1) {
      setCurrentPage(currentPage - 1)
      // console.log(currentPage)
    } 
  }

  let next = () => {
    if (currentPage < totalRows && currentPage < totalPages) {
      setCurrentPage(currentPage + 1)

    }
  }
  const handleClick = () => {
    console.log(textInput);
    fetch("http://localhost:4003/employees/"+ selectedRow.sentance_id, {
      method: 'PATCH',
      
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json '
      },
      body: JSON.stringify({
        "sentance_id": selectedRow.sentance_id,
        "source_lang": selectedRow.source_lang,
        "target_lang": textInput,
        "sugestions": selectedRow.sugestions,
        "page_no": selectedRow.page_no
      }),
     
      }).then((res)=>{
        res.json().then((result)=>{
          console.log(result)
          alert('success')
        })
      })
  }

  const handleChange = (event) => {
    setTextInput(event.target.value);
  }
    return (
      <div className="list">
        {
          data ?
            <div className="editor-page mt-5">
              
              <div className="d-flex alig-items-center justify-content-between">
                <div className=" edit-section">
                  <Table  bordered hover className="edit-table">
                    <thead>
                      <tr className="">
                        <th>#</th>
                        <th>English Language</th>
                        <th>Arabic Language</th>
                      </tr>
                    </thead>
                    <tbody>
                      
                    {
                      currentRow.map((item, i) =>
                        <tr key={i} className={`segment ${selectedRow?.sentance_id === item.sentance_id ? 'active' : ''}`} onClick={(key) => {
                          
                          setSelectedRow(item);
                          // console.log(item)
                          isActive();
                        }
                        } 
                        >

                          <td className={`segment-num ${selectedRow?.sentance_id === item.sentance_id ? 'active-num' : ''}`}>{item.sentance_id}</td>
                          <td>{item.source_lang}</td>
                          <td className="target-lang">
                            <div>
                              <input type="text" onChange={handleChange}
                              />
                            </div>
                          </td>

                        </tr>
                      )
                    }

                    </tbody>
                  </Table>
                    <div className="paginate">
                      <span onClick={previous}><GrPrevious /></span>
                      Page {currentPage} of {totalPages}
                      <span onClick={next}><GrNext /></span>

                      <button className="btn btn-primary" type="submit" onClick={handleClick}>Save</button>
                    </div>
                </div>
                <div className=" suggestion-section ml-0" >
                  <div>
                    <Table  bordered hover >
                      <thead>
                        <tr>
                          <th colSpan="2">Translation Result</th>
                        </tr>
                      </thead>
                      <tbody>

                        <tr>
                          <td><div className="suggestion">{selectedRow && selectedRow.sugestions}</div></td>
                          <td></td>
                        </tr>

                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
            :
            <p>Loading...</p>
        }
      </div>
    );
  }

  export default TranslationTable;