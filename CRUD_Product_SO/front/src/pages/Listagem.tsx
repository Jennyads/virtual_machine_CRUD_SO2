import {
  FaSortUp,
  FaSortDown,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import { Container, Table, Form, FloatingLabel } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import excluir from "../images/excluir.png";
import ReactPaginate from "react-paginate";
import editar from "../images/editar.png";
import axios from "axios";
import "../App.css";
import { URI } from "../enumerations/uri";
import { avisoDeletar } from "../controllers/avisoConcluido";
import { avisoErroDeletar } from "../controllers/avisoErro";
import { Link } from "react-router-dom";
import { Products } from "../types";



function ListagemCall() {

  const url_atual = window.location.href;
  const id = window.location.href.split("/")[4]

  const [data, setData] = useState<Products[]>([]);

  //axios get
  useEffect(() => {
    async function fetchCalls() {
      axios
        .get(URI.PEGAR_PRODUTO)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchCalls();
  }, []);

  //delete
  async function handleDeleteCall(id: number) {
    try {
     avisoDeletar().then( async (result) => {
        if(result.isConfirmed){
          await axios.delete(`${URI.DELETE_PRODUTO}${id}`);
          const updatedCalls = data.filter((call) => call.id !== id);
          setData(updatedCalls);
        }
        
      })
      
    } catch (error) {
      console.error(error);
      avisoErroDeletar();
    }
  }


  //sort
  const [order, setOrder] = useState<"ASC" | "DSC">("ASC");
  const sorting = (col: keyof typeof data[0]) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toString().toLowerCase() > b[col].toString().toLowerCase()
          ? 1
          : -1
      );
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toString().toLowerCase() < b[col].toString().toLowerCase()
          ? 1
          : -1
      );
      setData(sorted);
      setOrder("ASC");
    }
  };

  //pagination
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  //animate
  const [show, setShow] = useState<number | null>(null);
  const parent = useRef(null);
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);
  const reveal = (id: number) => {
    setShow(show === id ? null : id);
  };

  //search
  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredData = data.filter(
    (item) =>
      item.prodTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.prodPrice.toLowerCase().includes(searchQuery.toLowerCase())

  );

  return (
    <>
      <div className="text-center">
        <h1 className="text-dark fw-bolder mb-0 font-padrao-titulo">
          Listagem de Produtos
        </h1>
      </div>
      <Container className="px-2 mb-5">
        <Container>
          <div className="box-search">
            <input
              className="input-search"
              type="text"
              placeholder="Pesquisar"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
          <Table bordered hover responsive>
            <thead>
              <tr>
                {/*cabeçalho tabela*/}
                <th onClick={() => sorting("id")} className="text-center">
                  Identificador do Produto
                  {order === "ASC" ? <FaSortUp /> : <FaSortDown />}
                </th>
                <th
                  onClick={() => sorting("prodTitle")}
                  className="text-center"
                >
                  Nome do Produto
                  {order === "ASC" ? <FaSortUp /> : <FaSortDown />}
                </th>
                <th onClick={() => sorting("prodPrice")} className="text-center">
                  Preço
                  {order === "ASC" ? <FaSortUp /> : <FaSortDown />}
                </th>
               
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredData
                .slice(pagesVisited, pagesVisited + itemsPerPage)
                .map((data) => {
                  return (
                    <tr key={data.id}>
                      {/*corpo tabela*/}
                      <td className="text-center">
                        {/*animate*/}
                        <strong
                          className="dropdown-label"
                          onClick={() => reveal(data.id)}
                        >
                          {data.id}
                        </strong>
                      </td>
                      <td className="text-center">{data.prodTitle}</td>
                      <td className="text-center">{data.prodPrice}</td>
          
                      <td className="text-center">
                        <Link to={"/editar/" + data.id}>
                            <img style={{ width: '25px' }} src={editar} alt='Editar' />
                        </Link>
                        <img
                          style={{ width: "35px" }}
                          src={excluir}
                          alt="Excluir"
                          onClick={() => handleDeleteCall(data.id)}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
            {/*pagination*/}
            {data.length > itemsPerPage && (
              <ReactPaginate
                previousLabel={<FaChevronLeft />}
                nextLabel={<FaChevronRight />}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination right"}
                activeClassName={"active"}
              />
            )}
          </Table>
          {/*animate*/}
          {data.map((item) => {
            return (
              <div key={item.id} ref={parent}>
                {show === item.id && (
                  <FloatingLabel controlId="floatingLabel" label="Descrição">
                    <Form.Control
                      type="text"
                      defaultValue={item.prodDescription}
                      disabled
                    />
                  </FloatingLabel>
                )}
              </div>
            );
          })}
        </Container>
      </Container>
    </>
  );
}

export default ListagemCall;
