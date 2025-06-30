CREATE TABLE Clientes (
    Id UUID PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL
);

CREATE TABLE Produtos (
    Id UUID PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Preco DECIMAL(10,2) NOT NULL
);

CREATE TABLE Pedidos (
    Id UUID PRIMARY KEY,
    ClienteId UUID NOT NULL,
    ProdutoId UUID NOT NULL,
    Status VARCHAR(50) NOT NULL,
    DataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    DataAtualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cliente FOREIGN KEY (ClienteId) REFERENCES Clientes(Id),
    CONSTRAINT fk_produto FOREIGN KEY (ProdutoId) REFERENCES Produtos(Id)
);

INSERT INTO Clientes (Id, Nome) VALUES
  ('d2d15569-0f88-409c-9aa2-d16f2c853a65', 'Evaldo Rodrigues'),
  ('5d26e30e-f208-4d84-9010-ce0dbde7cec6', 'Neuliane Moura'),
  ('219338e0-a03e-4779-9d30-0573ea550ab9', 'Marcos Rufino'),
  ('b234582b-4a29-44e0-959d-5fdd616018f1', 'Tales Augusto'),
  ('7cb00897-0ac2-433a-8c98-1da6b7cd5dc0', 'Jamylle Amaral');

INSERT INTO Produtos (Id, Nome, Preco) VALUES
  ('98baa74a-428e-43c6-ac46-b6dd292bdf1a', 'Café 3 Corações Tradicional 500g', 18.90),
  ('0ec23a4d-11cc-4fe2-ba68-74052f71a8a2', 'Café 3 Corações Extra Forte 500g', 19.90),
  ('b0cb0687-49be-40b3-a2c3-c1701b337373', 'Café 3 Corações Gourmet 250g', 22.50),
  ('1548a672-5bfd-43cb-b3b0-cbd1b6886966', 'Cappuccino 3 Corações Classic 200g', 13.90),
  ('9db63729-591b-40c3-9877-dfa7bef04d9e', 'Cappuccino 3 Corações Chocolate 200g', 14.90),
  ('979414a6-7641-4f9c-b6cb-91f4e79b6be9', 'Café Solúvel 3 Corações 100g', 12.50),
  ('b5b63b35-6c12-44df-be6c-9912006a43b6', 'Café em Cápsula 3 Corações Espresso', 18.90),
  ('9e94402f-16b5-4d9c-a0c2-315b226782f4', 'Café em Cápsula 3 Corações Descafeinado', 19.50),
  ('8defeb8f-f152-4599-803d-500f3b014673', 'Café 3 Corações Orgânico 250g', 24.90),
  ('5839c101-fa73-433e-ab26-c0bd0a7fe39d', 'Filtro de Papel 3 Corações nº 103', 7.90);


INSERT INTO Pedidos (Id, ClienteId, ProdutoId, Status, DataCriacao, DataAtualizacao) VALUES
('b1eeb8f0-7903-4e90-8352-9c1d92c64c01', 'd2d15569-0f88-409c-9aa2-d16f2c853a65', '98baa74a-428e-43c6-ac46-b6dd292bdf1a', 'Finalizado', '2025-06-01 10:00:00', '2025-06-01 12:30:00'),
('91a6e83e-25cf-4fd8-83fc-e5e88773953e', '5d26e30e-f208-4d84-9010-ce0dbde7cec6', '0ec23a4d-11cc-4fe2-ba68-74052f71a8a2', 'Finalizado', '2025-06-02 09:15:00', '2025-06-02 10:00:00'),
('2f80fd08-7728-4b84-87dc-9be09fc5b09f', '219338e0-a03e-4779-9d30-0573ea550ab9', 'b0cb0687-49be-40b3-a2c3-c1701b337373', 'Finalizado', '2025-06-03 14:45:00', '2025-06-03 16:00:00'),
('50c49f9a-30e1-42ae-9851-7e8d0df84d67', 'b234582b-4a29-44e0-959d-5fdd616018f1', '1548a672-5bfd-43cb-b3b0-cbd1b6886966', 'Finalizado', '2025-06-04 11:20:00', '2025-06-04 13:00:00'),
('81d7c94d-cdf0-4f98-81dc-2192343a35a9', '7cb00897-0ac2-433a-8c98-1da6b7cd5dc0', '9db63729-591b-40c3-9877-dfa7bef04d9e', 'Finalizado', '2025-06-05 08:00:00', '2025-06-05 09:00:00'),
('7651398a-1d62-4e02-82ed-0db1dfd8a82b', 'd2d15569-0f88-409c-9aa2-d16f2c853a65', '979414a6-7641-4f9c-b6cb-91f4e79b6be9', 'Finalizado', '2025-06-06 12:30:00', '2025-06-06 14:00:00'),
('cbe38891-85cb-4c88-a009-9aee7dd7d70a', '5d26e30e-f208-4d84-9010-ce0dbde7cec6', 'b5b63b35-6c12-44df-be6c-9912006a43b6', 'Finalizado', '2025-06-07 17:00:00', '2025-06-07 18:30:00'),
('67e670b7-d5c6-403f-b4f7-2415d578b89f', '219338e0-a03e-4779-9d30-0573ea550ab9', '9e94402f-16b5-4d9c-a0c2-315b226782f4', 'Finalizado', '2025-06-08 07:30:00', '2025-06-08 08:30:00'),
('430dc4a6-bd4c-41a7-88e1-72799d0862f2', 'b234582b-4a29-44e0-959d-5fdd616018f1', '8defeb8f-f152-4599-803d-500f3b014673', 'Finalizado', '2025-06-09 13:15:00', '2025-06-09 15:00:00'),
('76dd231b-3f88-4dcf-a750-b3803f54189b', '7cb00897-0ac2-433a-8c98-1da6b7cd5dc0', '5839c101-fa73-433e-ab26-c0bd0a7fe39d', 'Finalizado', '2025-06-10 10:00:00', '2025-06-10 11:30:00'),
('e4d9acfc-f4ef-4665-a161-dbe350826af4', 'd2d15569-0f88-409c-9aa2-d16f2c853a65', '0ec23a4d-11cc-4fe2-ba68-74052f71a8a2', 'Finalizado', '2025-06-11 09:10:00', '2025-06-11 10:30:00'),
('6e290f62-3e9a-42a5-b776-8577288026cf', '5d26e30e-f208-4d84-9010-ce0dbde7cec6', '98baa74a-428e-43c6-ac46-b6dd292bdf1a', 'Finalizado', '2025-06-12 14:00:00', '2025-06-12 16:00:00'),
('6e84c5c0-5862-4595-8b2f-f09ed9e14699', '219338e0-a03e-4779-9d30-0573ea550ab9', '979414a6-7641-4f9c-b6cb-91f4e79b6be9', 'Finalizado', '2025-06-13 15:00:00', '2025-06-13 16:45:00'),
('1421a5c1-b68b-4c3a-9d03-85de9f0f358f', 'b234582b-4a29-44e0-959d-5fdd616018f1', 'b0cb0687-49be-40b3-a2c3-c1701b337373', 'Finalizado', '2025-06-14 08:15:00', '2025-06-14 09:30:00'),
('f302f9be-1f26-4697-9e89-52926c1ab7f2', '7cb00897-0ac2-433a-8c98-1da6b7cd5dc0', '1548a672-5bfd-43cb-b3b0-cbd1b6886966', 'Finalizado', '2025-06-15 12:00:00', '2025-06-15 13:30:00'),
('bafe447c-d84d-4958-950c-3e62aaf4b409', 'd2d15569-0f88-409c-9aa2-d16f2c853a65', '9e94402f-16b5-4d9c-a0c2-315b226782f4', 'Finalizado', '2025-06-16 07:00:00', '2025-06-16 08:45:00'),
('f88f2a68-f56e-4c3a-8c93-73fcad58ef85', '5d26e30e-f208-4d84-9010-ce0dbde7cec6', '5839c101-fa73-433e-ab26-c0bd0a7fe39d', 'Finalizado', '2025-06-17 10:30:00', '2025-06-17 11:30:00'),
('2f2912e1-7691-4a18-a5e0-c3c88693a961', '219338e0-a03e-4779-9d30-0573ea550ab9', '8defeb8f-f152-4599-803d-500f3b014673', 'Finalizado', '2025-06-18 09:45:00', '2025-06-18 11:15:00'),
('efc02b4f-c0b6-4e27-b15a-88a9efc4c63c', 'b234582b-4a29-44e0-959d-5fdd616018f1', 'b5b63b35-6c12-44df-be6c-9912006a43b6', 'Finalizado', '2025-06-19 16:00:00', '2025-06-19 17:30:00'),
('74ce4864-9253-490f-bd30-0efac2ae95b9', '7cb00897-0ac2-433a-8c98-1da6b7cd5dc0', 'b5b63b35-6c12-44df-be6c-9912006a43b6', 'Finalizado', '2025-06-20 11:00:00', '2025-06-20 13:00:00'),
('a429a7c4-6b41-4c0d-8418-f3694c6eb261', 'd2d15569-0f88-409c-9aa2-d16f2c853a65', '9db63729-591b-40c3-9877-dfa7bef04d9e', 'Finalizado', '2025-06-21 14:00:00', '2025-06-21 15:30:00'),
('d4f705ec-6e7d-4f47-9a10-9d384fdf848f', '5d26e30e-f208-4d84-9010-ce0dbde7cec6', '0ec23a4d-11cc-4fe2-ba68-74052f71a8a2', 'Finalizado', '2025-06-22 10:30:00', '2025-06-22 11:15:00'),
('76f3e2f0-3ac3-4647-a7b4-45c3e8a81637', '219338e0-a03e-4779-9d30-0573ea550ab9', 'b0cb0687-49be-40b3-a2c3-c1701b337373', 'Finalizado', '2025-06-23 07:15:00', '2025-06-23 08:30:00'),
('2909381f-2fe7-4c3e-9878-7a2f3369fbea', 'b234582b-4a29-44e0-959d-5fdd616018f1', '1548a672-5bfd-43cb-b3b0-cbd1b6886966', 'Finalizado', '2025-06-24 13:20:00', '2025-06-24 14:45:00'),
('7db30015-02fd-4f8a-a3f2-75567c4389fd', '7cb00897-0ac2-433a-8c98-1da6b7cd5dc0', '979414a6-7641-4f9c-b6cb-91f4e79b6be9', 'Finalizado', '2025-06-25 09:00:00', '2025-06-25 09:45:00'),
('1030d1d6-67b6-4e94-8d93-3e79f15a12ab', 'd2d15569-0f88-409c-9aa2-d16f2c853a65', 'b5b63b35-6c12-44df-be6c-9912006a43b6', 'Finalizado', '2025-06-26 08:30:00', '2025-06-26 09:30:00'),
('d8e8a3f9-f1b5-41ef-970f-eeb3a844dc84', '5d26e30e-f208-4d84-9010-ce0dbde7cec6', '9e94402f-16b5-4d9c-a0c2-315b226782f4', 'Finalizado', '2025-06-27 15:45:00', '2025-06-27 17:00:00'),
('e790e325-3452-4cd9-a758-4fd9cb3fc872', '219338e0-a03e-4779-9d30-0573ea550ab9', '8defeb8f-f152-4599-803d-500f3b014673', 'Finalizado', '2025-06-28 11:00:00', '2025-06-28 12:15:00'),
('ac2cb0ef-f3e0-4053-86ea-91850ac45fc6', 'b234582b-4a29-44e0-959d-5fdd616018f1', '5839c101-fa73-433e-ab26-c0bd0a7fe39d', 'Finalizado', '2025-06-29 09:30:00', '2025-06-29 10:30:00'),
('1c9d2933-fb1a-4563-854c-1b22f772f43f', '7cb00897-0ac2-433a-8c98-1da6b7cd5dc0', '98baa74a-428e-43c6-ac46-b6dd292bdf1a', 'Finalizado', '2025-06-30 08:00:00', '2025-06-30 09:45:00');
