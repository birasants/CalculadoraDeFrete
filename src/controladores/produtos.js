const produtos = require('../bancodedados/produtos');
const {getStateFromZipcode} = require('utils-playground')
const listarProdutos = async (req,res)=>{
  return res.json(produtos);
}

const getProdutobyID = async (req,res)=>{
  const id = Number(req.params.id);

  const produtoExiste = produtos.find(produto => produto.id === id);

  if(!produtoExiste){
    return res.status(404).json({mensagem:"Id inserido invalido!"});
  }
  return res.json(produtoExiste);
}

const calculaFrete = async (req,res)=>{
  const id = Number(req.params.id);
  const cep = req.params.cep

  const produtoExiste = produtos.find(produto => produto.id === id);
  if(!produtoExiste){
    return res.status(404).json({mensagem:"Id inserido invalido!"});
  }
  const valorItem = produtoExiste.valor;

  const estado = await getStateFromZipcode(cep);

  let valorFrete = 0;

  if(estado === 'BA' || estado === 'SE' || estado === 'AL' || estado === 'PE' || estado === 'PB'){
    valorFrete = valorItem* 0.1;
    return res.json({
      produtoExiste,
      estado,
      frete: valorFrete
    });
  }
  if(estado === 'SP' || estado === 'RJ'){
    valorFrete = valorItem * 0.15;
    return res.json({
      produtoExiste,
      estado,
      frete: valorFrete
    })
  }
  return res.json({
    produtoExiste,
    estado,
    frete:valorFrete
  })
  
  
}
module.exports ={
  listarProdutos,
  getProdutobyID,
  calculaFrete
}