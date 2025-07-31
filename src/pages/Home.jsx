import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import LogoFacilitaOdonto from "../assets/Logo-FacilitaOdonto.svg";
import Swal from "sweetalert2";
import "./home.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function Home() {
  const [procedimentoSelecionado, setProcedimentoSelecionado] = useState(null);
  const [precoUnitarioProduto, setPrecoUnitarioProduto] = useState("");
  const [nomeProduto, setNomeProduto] = useState("");
  const [quantidadeProduto, setQuantidadeProduto] = useState(null);
  const [quantidadeUsadaNoProcedimento, setQuantidadeUsadaNoProcedimento] = useState();
  const [produtos, setProdutos] = useState([]);

  const adicionarProduto = () => {
    if (!nomeProduto || !precoUnitarioProduto || !quantidadeProduto || !quantidadeUsadaNoProcedimento || !procedimentoSelecionado) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Preencha todos os campos!",
        confirmButtonColor: "#326fb6",
      });
    }

    const novoProduto = {
      nome: nomeProduto,
      preco: precoUnitarioProduto,
      quantidadeProduto,
      quantidadeUsadaNoProcedimento,
    };

    setProdutos([...produtos, novoProduto]);

    showClear()
  };

  const showClear = () => {
    setNomeProduto("");
    setPrecoUnitarioProduto("");
    setQuantidadeProduto(null);
    setQuantidadeUsadaNoProcedimento(null);
  }

  const listaProcedimentos = [
    { name: "Profilaxia" },
    { name: "Raspagem supra + subgengival " },
    { name: "Restauração simples" },
    { name: "Restauração indireta" },
    { name: "Pino de fibra de vidro" },
    { name: "Preparo para coroa" },
    { name: "Faceta" },
    { name: "Exodontia simples" },
    { name: "Exodontia complexa" },
    { name: "Gengivoplastia simples" },
    { name: "Gengivoplastia complexa" },
  ];

  const calcularCustoTotal = () => {
    return produtos.reduce((total, produto) => {
      const precoUnit = produto.preco / produto.quantidadeProduto;
      return total + precoUnit * produto.quantidadeUsadaNoProcedimento;
    }, 0);
  };

  return (
    <div className="app-container">
      <div className="intro-section">
        <img className="app-logo" src={LogoFacilitaOdonto} alt="Logo Facilita Odonto" />
        <p>Calcule custos, otimize atendimentos. Facilite sua rotina com o Facilita Odonto.</p>
      </div>

      <div className="cards-container">
        <div className="form-cards-column">
          {/* Card: Seleção de Procedimento */}
          <div className="card-procedimento">
            <div className="card-content">
              <p className="card-title">Procedimento</p>
              <span className="card-label">Selecione o Procedimento</span>
              <div className="input-wrapper">
                <Dropdown
                  value={procedimentoSelecionado}
                  onChange={(e) => setProcedimentoSelecionado(e.value)}
                  options={listaProcedimentos}
                  optionLabel="name"
                  showClear
                  placeholder="Procedimento"
                  className="input-dropdown"
                />
              </div>
            </div>
          </div>

          {/* Card: Cadastro de Produto */}
          <div className="card-produto">
            <div className="card-content">
              <p className="card-title">Produtos Utilizados</p>

              <label>Nome do Produto</label>
              <div className="input-wrapper">
                <InputText
                  value={nomeProduto}
                  onChange={(e) => setNomeProduto(e.target.value)}
                  placeholder="Nome"
                  className="input-nome"
                />
              </div>

              <div className="input-group">
                <div className="input-item">
                  <label>Preço</label>
                  <InputNumber
                    mode="currency"
                    currency="BRL"
                    locale="pt-BR"
                    value={precoUnitarioProduto}
                    placeholder="R$ 0.00"
                    onValueChange={(e) => setPrecoUnitarioProduto(e.value)}
                    className="input-preco"
                  />
                </div>

                <div className="input-item">
                  <label>Quantidade</label>
                  <InputNumber
                    value={quantidadeProduto}
                    onValueChange={(e) => setQuantidadeProduto(e.value)}
                    mode="decimal"
                    minFractionDigits={1}
                    maxFractionDigits={2}
                    placeholder="ex: 100, 0.5...(unid, ml, g)"
                    className="input-quantidade"
                  />
                </div>

                <div className="input-item">
                  <label>Uso no Procedimento</label>
                  <InputNumber
                    value={quantidadeUsadaNoProcedimento}
                    onValueChange={(e) => setQuantidadeUsadaNoProcedimento(e.value)}
                    mode="decimal"
                    minFractionDigits={1}
                    maxFractionDigits={2}
                    placeholder="ex: 100, 0.5...(unid, ml, g)"
                    className="input-uso"
                  />
                </div>
              </div>

              <button className="btn-submit" onClick={adicionarProduto}>Adicionar ao Procedimento</button>
            </div>
          </div>
        </div>

        {/* Card: Resultado de Custo */}

        <div className="card-custo">
          <div className="card-content">
            <h2>Custo do Procedimento</h2>

            <h3>Procedimento</h3>
            <p>{procedimentoSelecionado?.name || "Nenhum procedimento selecionado"}</p>

            <h3>Produtos Utilizados</h3>
            {produtos.length === 0 ? (
              <p>Nenhum produto adicionado</p>
            ) : (
              <div className="produtos-wrapper">
                <Swiper
                  modules={[Navigation, Scrollbar]}
                  slidesPerView="auto"
                  spaceBetween={2}
                  navigation
                  scrollbar={{
                    draggable: true,
                    hide: false
                  }}
                  freeMode={true}
                  className="swipe-produtos"
                >
                  {produtos.map((produto, index) => (
                    <SwiperSlide key={index}>
                      <div className="produto-cards">
                        <div className="produto-card-content">
                          <p><strong>Produto:</strong><span> {produto.nome}</span></p>
                          <p><strong>Quantidade:</strong> {produto.quantidadeProduto}</p>
                          <p><strong>Uso no Procedimento:</strong> {produto.quantidadeUsadaNoProcedimento}</p>
                          <p>
                            <strong>Custo Utilizado:</strong>
                            R$ {((produto.preco / produto.quantidadeProduto) * produto.quantidadeUsadaNoProcedimento).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            <hr className="liner" />
          </div>

          <div className="footer-custo">
            <h4>Custo Total: R$ {calcularCustoTotal().toFixed(2)}</h4>
            <button onClick={() => window.location.reload()} className="btn-recarregar">
              🔄 Recarregar Página
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}


export default Home;
