--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6
-- Dumped by pg_dump version 16.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Clientes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Clientes" (
    "id_Cliente" integer NOT NULL,
    "Nombre" character varying(255) NOT NULL,
    "Cuil" character varying(255) NOT NULL
);


--
-- Name: Clientes_id_Cliente_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Clientes_id_Cliente_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Clientes_id_Cliente_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Clientes_id_Cliente_seq" OWNED BY public."Clientes"."id_Cliente";


--
-- Name: CompraMateriaPrima; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."CompraMateriaPrima" (
    id_cmp integer NOT NULL,
    "Id_Compras" integer NOT NULL,
    "id_MateriaPrima" integer NOT NULL,
    "Cantidad" integer NOT NULL,
    "PrecioUnitario" integer NOT NULL
);


--
-- Name: CompraMateriaPrima_id_cmp_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."CompraMateriaPrima_id_cmp_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: CompraMateriaPrima_id_cmp_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."CompraMateriaPrima_id_cmp_seq" OWNED BY public."CompraMateriaPrima".id_cmp;


--
-- Name: Compras; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Compras" (
    "Id_Compras" integer NOT NULL,
    "Fecha" timestamp with time zone NOT NULL,
    "Id_Estado" integer DEFAULT 1 NOT NULL,
    "Factura_N" character varying(255) NOT NULL,
    "Importe" numeric(10,2) NOT NULL,
    "Marca" character varying(255) NOT NULL,
    "IVA21" numeric(10,2),
    "IVA10_5" numeric(10,2),
    "PercepcionIVA" numeric(10,2),
    "PercepcionesMuniCba" numeric(10,2),
    "Flete" numeric(10,2)
);


--
-- Name: Compras_Id_Compras_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Compras_Id_Compras_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Compras_Id_Compras_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Compras_Id_Compras_seq" OWNED BY public."Compras"."Id_Compras";


--
-- Name: Devolucion; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Devolucion" (
    "id_Devolucion" integer NOT NULL,
    "id_Producto" integer NOT NULL,
    "Fecha" timestamp with time zone NOT NULL,
    "Cantidad" integer NOT NULL
);


--
-- Name: Devolucion_id_Devolucion_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Devolucion_id_Devolucion_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Devolucion_id_Devolucion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Devolucion_id_Devolucion_seq" OWNED BY public."Devolucion"."id_Devolucion";


--
-- Name: Egresos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Egresos" (
    "Id_Egresos" integer NOT NULL,
    "Fecha" timestamp with time zone NOT NULL,
    "Concepto" character varying(255) NOT NULL,
    "Comprobante" character varying(255) NOT NULL,
    "ImporteTotal" numeric(10,2) NOT NULL
);


--
-- Name: Egresos_Id_Egresos_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Egresos_Id_Egresos_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Egresos_Id_Egresos_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Egresos_Id_Egresos_seq" OWNED BY public."Egresos"."Id_Egresos";


--
-- Name: Estados; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Estados" (
    "Id_Estado" integer NOT NULL,
    "Estado" character varying(255) NOT NULL
);


--
-- Name: Estados_Id_Estado_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Estados_Id_Estado_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Estados_Id_Estado_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Estados_Id_Estado_seq" OWNED BY public."Estados"."Id_Estado";


--
-- Name: Gastos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Gastos" (
    "Id_Gastos" integer NOT NULL,
    "Id_TipoGastos" integer NOT NULL,
    "Id_Egresos" integer NOT NULL,
    "Importe" numeric NOT NULL
);


--
-- Name: Gastos_Id_Gastos_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Gastos_Id_Gastos_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Gastos_Id_Gastos_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Gastos_Id_Gastos_seq" OWNED BY public."Gastos"."Id_Gastos";


--
-- Name: IVACompras; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."IVACompras" (
    "Id_IvaCompras" integer NOT NULL,
    "Fecha" timestamp with time zone NOT NULL,
    "Factura" character varying(255) NOT NULL,
    "Factura_N" integer NOT NULL,
    "Id_Cliente" integer,
    "Id_Proveedor" integer,
    "CondicionIva" character varying(255) NOT NULL,
    "Neto" numeric(10,2) NOT NULL,
    "IVA21" numeric(10,2),
    "IVA10_5" numeric(10,2),
    "PercIVA" numeric(10,2),
    "IngrBrutosRetEfect" numeric(10,2),
    "ConceptosNoAgravados" numeric(10,2),
    "Flete10_5" numeric(10,2),
    "PercepcionesCba" numeric(10,2),
    "PercepcionesIIBB" numeric(10,2),
    "ImporteTotal" numeric(10,2)
);


--
-- Name: IVACompras_Id_IvaCompras_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."IVACompras_Id_IvaCompras_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: IVACompras_Id_IvaCompras_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."IVACompras_Id_IvaCompras_seq" OWNED BY public."IVACompras"."Id_IvaCompras";


--
-- Name: IVAVentas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."IVAVentas" (
    "Id_IvaVentas" integer NOT NULL,
    "Fecha" timestamp with time zone NOT NULL,
    "Factura" character varying(255) NOT NULL,
    "Factura_N" integer NOT NULL,
    "Id_Cliente" integer,
    "Id_Proveedor" integer,
    "CondicionIva" character varying(255) NOT NULL,
    "Neto" numeric(10,2) NOT NULL,
    "IVA21" numeric(10,2) NOT NULL,
    "IVA10_5" numeric(10,2),
    "Retenciones" numeric(10,2),
    "ImporteTotal" numeric(10,2) NOT NULL
);


--
-- Name: IVAVentas_Id_IvaVentas_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."IVAVentas_Id_IvaVentas_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: IVAVentas_Id_IvaVentas_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."IVAVentas_Id_IvaVentas_seq" OWNED BY public."IVAVentas"."Id_IvaVentas";


--
-- Name: Ingresos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Ingresos" (
    "id_Ingreso" integer NOT NULL,
    "Fecha" timestamp with time zone NOT NULL,
    "Nombre" character varying(255) NOT NULL,
    "Detalle" character varying(255),
    "NroComprobante" integer,
    "Total" numeric(10,2) NOT NULL,
    "Id_Vendedor" integer NOT NULL,
    "Id_Estado" integer DEFAULT 1 NOT NULL,
    "Cheque" boolean,
    "Efectivo" boolean,
    "Transferencia" boolean
);


--
-- Name: Ingresos_id_Ingreso_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Ingresos_id_Ingreso_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Ingresos_id_Ingreso_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Ingresos_id_Ingreso_seq" OWNED BY public."Ingresos"."id_Ingreso";


--
-- Name: MateriaPrima; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."MateriaPrima" (
    "id_MateriaPrima" integer NOT NULL,
    "Nombre" character varying(255) NOT NULL
);


--
-- Name: MateriaPrimaPorProducto; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."MateriaPrimaPorProducto" (
    "id_MpxP" integer NOT NULL,
    "id_Producto" integer NOT NULL,
    "id_MateriaPrima" integer NOT NULL,
    "cantidadNecesaria" double precision NOT NULL
);


--
-- Name: MateriaPrimaPorProducto_id_MpxP_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."MateriaPrimaPorProducto_id_MpxP_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: MateriaPrimaPorProducto_id_MpxP_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."MateriaPrimaPorProducto_id_MpxP_seq" OWNED BY public."MateriaPrimaPorProducto"."id_MpxP";


--
-- Name: MateriaPrima_id_MateriaPrima_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."MateriaPrima_id_MateriaPrima_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: MateriaPrima_id_MateriaPrima_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."MateriaPrima_id_MateriaPrima_seq" OWNED BY public."MateriaPrima"."id_MateriaPrima";


--
-- Name: Produccion; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Produccion" (
    "id_Produccion" integer NOT NULL,
    "id_Producto" integer NOT NULL,
    "Fecha" timestamp with time zone NOT NULL,
    "Cantidad" integer NOT NULL
);


--
-- Name: Produccion_id_Produccion_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Produccion_id_Produccion_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Produccion_id_Produccion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Produccion_id_Produccion_seq" OWNED BY public."Produccion"."id_Produccion";


--
-- Name: Productos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Productos" (
    "Id_Producto" integer NOT NULL,
    "Codigo" integer NOT NULL,
    "Nombre" character varying(255) NOT NULL
);


--
-- Name: Productos_Id_Producto_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Productos_Id_Producto_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Productos_Id_Producto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Productos_Id_Producto_seq" OWNED BY public."Productos"."Id_Producto";


--
-- Name: Proveedor; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Proveedor" (
    "id_Proveedor" integer NOT NULL,
    "Nombre" character varying(255) NOT NULL,
    "Cuit" character varying(255) NOT NULL
);


--
-- Name: Proveedor_id_Proveedor_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Proveedor_id_Proveedor_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Proveedor_id_Proveedor_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Proveedor_id_Proveedor_seq" OWNED BY public."Proveedor"."id_Proveedor";


--
-- Name: Remito; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Remito" (
    "Id_Remito" integer NOT NULL,
    "Senior" character varying(255) NOT NULL,
    "Domicilio" character varying(255) NOT NULL,
    "Fecha" timestamp with time zone NOT NULL,
    "Id_Estado" integer DEFAULT 1 NOT NULL,
    "remitoPDF" bytea
);


--
-- Name: RemitoProducto; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."RemitoProducto" (
    "Id_RemitoProducto" integer NOT NULL,
    "Id_Remito" integer NOT NULL,
    "Id_Producto" integer NOT NULL,
    "Cantidad" integer NOT NULL,
    "PrecioUnit" numeric(10,2) NOT NULL,
    "PrecioTotal" numeric(10,2) NOT NULL
);


--
-- Name: RemitoProducto_Id_RemitoProducto_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."RemitoProducto_Id_RemitoProducto_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: RemitoProducto_Id_RemitoProducto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."RemitoProducto_Id_RemitoProducto_seq" OWNED BY public."RemitoProducto"."Id_RemitoProducto";


--
-- Name: Remito_Id_Remito_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Remito_Id_Remito_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Remito_Id_Remito_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Remito_Id_Remito_seq" OWNED BY public."Remito"."Id_Remito";


--
-- Name: TipoGastos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."TipoGastos" (
    "Id_TipoGastos" integer NOT NULL,
    "Tipo_Gasto" character varying(255) NOT NULL
);


--
-- Name: TipoGastos_Id_TipoGastos_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."TipoGastos_Id_TipoGastos_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: TipoGastos_Id_TipoGastos_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."TipoGastos_Id_TipoGastos_seq" OWNED BY public."TipoGastos"."Id_TipoGastos";


--
-- Name: Usuarios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Usuarios" (
    "id_Usuario" integer NOT NULL,
    "Usuario" character varying(255) NOT NULL,
    "Mail" character varying(255) NOT NULL,
    "Contrasenia" character varying(255) NOT NULL
);


--
-- Name: Usuarios_id_Usuario_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Usuarios_id_Usuario_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Usuarios_id_Usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Usuarios_id_Usuario_seq" OWNED BY public."Usuarios"."id_Usuario";


--
-- Name: Vendedores; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Vendedores" (
    "Id_Vendedor" integer NOT NULL,
    "Nombre" character varying(255) NOT NULL,
    "Cuit" character varying(255) NOT NULL
);


--
-- Name: Vendedores_Id_Vendedor_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Vendedores_Id_Vendedor_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Vendedores_Id_Vendedor_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Vendedores_Id_Vendedor_seq" OWNED BY public."Vendedores"."Id_Vendedor";


--
-- Name: VentasMercaderia; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."VentasMercaderia" (
    "Id_VentaMercaderia" integer NOT NULL,
    "id_Producto" integer NOT NULL,
    "Fecha" timestamp with time zone NOT NULL,
    "Cantidad" integer NOT NULL
);


--
-- Name: VentasMercaderia_Id_VentaMercaderia_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."VentasMercaderia_Id_VentaMercaderia_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: VentasMercaderia_Id_VentaMercaderia_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."VentasMercaderia_Id_VentaMercaderia_seq" OWNED BY public."VentasMercaderia"."Id_VentaMercaderia";


--
-- Name: Clientes id_Cliente; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Clientes" ALTER COLUMN "id_Cliente" SET DEFAULT nextval('public."Clientes_id_Cliente_seq"'::regclass);


--
-- Name: CompraMateriaPrima id_cmp; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CompraMateriaPrima" ALTER COLUMN id_cmp SET DEFAULT nextval('public."CompraMateriaPrima_id_cmp_seq"'::regclass);


--
-- Name: Compras Id_Compras; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Compras" ALTER COLUMN "Id_Compras" SET DEFAULT nextval('public."Compras_Id_Compras_seq"'::regclass);


--
-- Name: Devolucion id_Devolucion; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Devolucion" ALTER COLUMN "id_Devolucion" SET DEFAULT nextval('public."Devolucion_id_Devolucion_seq"'::regclass);


--
-- Name: Egresos Id_Egresos; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Egresos" ALTER COLUMN "Id_Egresos" SET DEFAULT nextval('public."Egresos_Id_Egresos_seq"'::regclass);


--
-- Name: Estados Id_Estado; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Estados" ALTER COLUMN "Id_Estado" SET DEFAULT nextval('public."Estados_Id_Estado_seq"'::regclass);


--
-- Name: Gastos Id_Gastos; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Gastos" ALTER COLUMN "Id_Gastos" SET DEFAULT nextval('public."Gastos_Id_Gastos_seq"'::regclass);


--
-- Name: IVACompras Id_IvaCompras; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."IVACompras" ALTER COLUMN "Id_IvaCompras" SET DEFAULT nextval('public."IVACompras_Id_IvaCompras_seq"'::regclass);


--
-- Name: IVAVentas Id_IvaVentas; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."IVAVentas" ALTER COLUMN "Id_IvaVentas" SET DEFAULT nextval('public."IVAVentas_Id_IvaVentas_seq"'::regclass);


--
-- Name: Ingresos id_Ingreso; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Ingresos" ALTER COLUMN "id_Ingreso" SET DEFAULT nextval('public."Ingresos_id_Ingreso_seq"'::regclass);


--
-- Name: MateriaPrima id_MateriaPrima; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."MateriaPrima" ALTER COLUMN "id_MateriaPrima" SET DEFAULT nextval('public."MateriaPrima_id_MateriaPrima_seq"'::regclass);


--
-- Name: MateriaPrimaPorProducto id_MpxP; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."MateriaPrimaPorProducto" ALTER COLUMN "id_MpxP" SET DEFAULT nextval('public."MateriaPrimaPorProducto_id_MpxP_seq"'::regclass);


--
-- Name: Produccion id_Produccion; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Produccion" ALTER COLUMN "id_Produccion" SET DEFAULT nextval('public."Produccion_id_Produccion_seq"'::regclass);


--
-- Name: Productos Id_Producto; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Productos" ALTER COLUMN "Id_Producto" SET DEFAULT nextval('public."Productos_Id_Producto_seq"'::regclass);


--
-- Name: Proveedor id_Proveedor; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Proveedor" ALTER COLUMN "id_Proveedor" SET DEFAULT nextval('public."Proveedor_id_Proveedor_seq"'::regclass);


--
-- Name: Remito Id_Remito; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Remito" ALTER COLUMN "Id_Remito" SET DEFAULT nextval('public."Remito_Id_Remito_seq"'::regclass);


--
-- Name: RemitoProducto Id_RemitoProducto; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RemitoProducto" ALTER COLUMN "Id_RemitoProducto" SET DEFAULT nextval('public."RemitoProducto_Id_RemitoProducto_seq"'::regclass);


--
-- Name: TipoGastos Id_TipoGastos; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TipoGastos" ALTER COLUMN "Id_TipoGastos" SET DEFAULT nextval('public."TipoGastos_Id_TipoGastos_seq"'::regclass);


--
-- Name: Usuarios id_Usuario; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Usuarios" ALTER COLUMN "id_Usuario" SET DEFAULT nextval('public."Usuarios_id_Usuario_seq"'::regclass);


--
-- Name: Vendedores Id_Vendedor; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Vendedores" ALTER COLUMN "Id_Vendedor" SET DEFAULT nextval('public."Vendedores_Id_Vendedor_seq"'::regclass);


--
-- Name: VentasMercaderia Id_VentaMercaderia; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."VentasMercaderia" ALTER COLUMN "Id_VentaMercaderia" SET DEFAULT nextval('public."VentasMercaderia_Id_VentaMercaderia_seq"'::regclass);


--
-- Name: Clientes Clientes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Clientes"
    ADD CONSTRAINT "Clientes_pkey" PRIMARY KEY ("id_Cliente");


--
-- Name: CompraMateriaPrima CompraMateriaPrima_Id_Compras_id_MateriaPrima_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CompraMateriaPrima"
    ADD CONSTRAINT "CompraMateriaPrima_Id_Compras_id_MateriaPrima_key" UNIQUE ("Id_Compras", "id_MateriaPrima");


--
-- Name: CompraMateriaPrima CompraMateriaPrima_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CompraMateriaPrima"
    ADD CONSTRAINT "CompraMateriaPrima_pkey" PRIMARY KEY (id_cmp);


--
-- Name: Compras Compras_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Compras"
    ADD CONSTRAINT "Compras_pkey" PRIMARY KEY ("Id_Compras");


--
-- Name: Devolucion Devolucion_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Devolucion"
    ADD CONSTRAINT "Devolucion_pkey" PRIMARY KEY ("id_Devolucion");


--
-- Name: Egresos Egresos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Egresos"
    ADD CONSTRAINT "Egresos_pkey" PRIMARY KEY ("Id_Egresos");


--
-- Name: Estados Estados_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Estados"
    ADD CONSTRAINT "Estados_pkey" PRIMARY KEY ("Id_Estado");


--
-- Name: Gastos Gastos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Gastos"
    ADD CONSTRAINT "Gastos_pkey" PRIMARY KEY ("Id_Gastos");


--
-- Name: IVACompras IVACompras_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."IVACompras"
    ADD CONSTRAINT "IVACompras_pkey" PRIMARY KEY ("Id_IvaCompras");


--
-- Name: IVAVentas IVAVentas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."IVAVentas"
    ADD CONSTRAINT "IVAVentas_pkey" PRIMARY KEY ("Id_IvaVentas");


--
-- Name: Ingresos Ingresos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Ingresos"
    ADD CONSTRAINT "Ingresos_pkey" PRIMARY KEY ("id_Ingreso");


--
-- Name: MateriaPrimaPorProducto MateriaPrimaPorProducto_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."MateriaPrimaPorProducto"
    ADD CONSTRAINT "MateriaPrimaPorProducto_pkey" PRIMARY KEY ("id_MpxP");


--
-- Name: MateriaPrima MateriaPrima_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."MateriaPrima"
    ADD CONSTRAINT "MateriaPrima_pkey" PRIMARY KEY ("id_MateriaPrima");


--
-- Name: Produccion Produccion_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Produccion"
    ADD CONSTRAINT "Produccion_pkey" PRIMARY KEY ("id_Produccion");


--
-- Name: Productos Productos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Productos"
    ADD CONSTRAINT "Productos_pkey" PRIMARY KEY ("Id_Producto");


--
-- Name: Proveedor Proveedor_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Proveedor"
    ADD CONSTRAINT "Proveedor_pkey" PRIMARY KEY ("id_Proveedor");


--
-- Name: RemitoProducto RemitoProducto_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RemitoProducto"
    ADD CONSTRAINT "RemitoProducto_pkey" PRIMARY KEY ("Id_RemitoProducto");


--
-- Name: Remito Remito_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Remito"
    ADD CONSTRAINT "Remito_pkey" PRIMARY KEY ("Id_Remito");


--
-- Name: TipoGastos TipoGastos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TipoGastos"
    ADD CONSTRAINT "TipoGastos_pkey" PRIMARY KEY ("Id_TipoGastos");


--
-- Name: Usuarios Usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Usuarios"
    ADD CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id_Usuario");


--
-- Name: Vendedores Vendedores_Cuit_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Vendedores"
    ADD CONSTRAINT "Vendedores_Cuit_key" UNIQUE ("Cuit");


--
-- Name: Vendedores Vendedores_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Vendedores"
    ADD CONSTRAINT "Vendedores_pkey" PRIMARY KEY ("Id_Vendedor");


--
-- Name: VentasMercaderia VentasMercaderia_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."VentasMercaderia"
    ADD CONSTRAINT "VentasMercaderia_pkey" PRIMARY KEY ("Id_VentaMercaderia");


--
-- Name: CompraMateriaPrima CompraMateriaPrima_Id_Compras_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CompraMateriaPrima"
    ADD CONSTRAINT "CompraMateriaPrima_Id_Compras_fkey" FOREIGN KEY ("Id_Compras") REFERENCES public."Compras"("Id_Compras") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CompraMateriaPrima CompraMateriaPrima_id_MateriaPrima_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CompraMateriaPrima"
    ADD CONSTRAINT "CompraMateriaPrima_id_MateriaPrima_fkey" FOREIGN KEY ("id_MateriaPrima") REFERENCES public."MateriaPrima"("id_MateriaPrima") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Compras Compras_Id_Estado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Compras"
    ADD CONSTRAINT "Compras_Id_Estado_fkey" FOREIGN KEY ("Id_Estado") REFERENCES public."Estados"("Id_Estado") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Devolucion Devolucion_id_Producto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Devolucion"
    ADD CONSTRAINT "Devolucion_id_Producto_fkey" FOREIGN KEY ("id_Producto") REFERENCES public."Productos"("Id_Producto") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Gastos Gastos_Id_Egresos_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Gastos"
    ADD CONSTRAINT "Gastos_Id_Egresos_fkey" FOREIGN KEY ("Id_Egresos") REFERENCES public."Egresos"("Id_Egresos") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Gastos Gastos_Id_TipoGastos_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Gastos"
    ADD CONSTRAINT "Gastos_Id_TipoGastos_fkey" FOREIGN KEY ("Id_TipoGastos") REFERENCES public."TipoGastos"("Id_TipoGastos") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: IVACompras IVACompras_Id_Cliente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."IVACompras"
    ADD CONSTRAINT "IVACompras_Id_Cliente_fkey" FOREIGN KEY ("Id_Cliente") REFERENCES public."Clientes"("id_Cliente") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: IVACompras IVACompras_Id_Proveedor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."IVACompras"
    ADD CONSTRAINT "IVACompras_Id_Proveedor_fkey" FOREIGN KEY ("Id_Proveedor") REFERENCES public."Proveedor"("id_Proveedor") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: IVAVentas IVAVentas_Id_Cliente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."IVAVentas"
    ADD CONSTRAINT "IVAVentas_Id_Cliente_fkey" FOREIGN KEY ("Id_Cliente") REFERENCES public."Clientes"("id_Cliente") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: IVAVentas IVAVentas_Id_Proveedor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."IVAVentas"
    ADD CONSTRAINT "IVAVentas_Id_Proveedor_fkey" FOREIGN KEY ("Id_Proveedor") REFERENCES public."Proveedor"("id_Proveedor") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Ingresos Ingresos_Id_Estado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Ingresos"
    ADD CONSTRAINT "Ingresos_Id_Estado_fkey" FOREIGN KEY ("Id_Estado") REFERENCES public."Estados"("Id_Estado") ON UPDATE CASCADE;


--
-- Name: Ingresos Ingresos_Id_Vendedor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Ingresos"
    ADD CONSTRAINT "Ingresos_Id_Vendedor_fkey" FOREIGN KEY ("Id_Vendedor") REFERENCES public."Vendedores"("Id_Vendedor") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: MateriaPrimaPorProducto MateriaPrimaPorProducto_id_MateriaPrima_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."MateriaPrimaPorProducto"
    ADD CONSTRAINT "MateriaPrimaPorProducto_id_MateriaPrima_fkey" FOREIGN KEY ("id_MateriaPrima") REFERENCES public."MateriaPrima"("id_MateriaPrima") ON UPDATE CASCADE;


--
-- Name: MateriaPrimaPorProducto MateriaPrimaPorProducto_id_Producto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."MateriaPrimaPorProducto"
    ADD CONSTRAINT "MateriaPrimaPorProducto_id_Producto_fkey" FOREIGN KEY ("id_Producto") REFERENCES public."Productos"("Id_Producto") ON UPDATE CASCADE;


--
-- Name: Produccion Produccion_id_Producto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Produccion"
    ADD CONSTRAINT "Produccion_id_Producto_fkey" FOREIGN KEY ("id_Producto") REFERENCES public."Productos"("Id_Producto") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: RemitoProducto RemitoProducto_Id_Producto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RemitoProducto"
    ADD CONSTRAINT "RemitoProducto_Id_Producto_fkey" FOREIGN KEY ("Id_Producto") REFERENCES public."Productos"("Id_Producto") ON UPDATE CASCADE;


--
-- Name: RemitoProducto RemitoProducto_Id_Remito_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RemitoProducto"
    ADD CONSTRAINT "RemitoProducto_Id_Remito_fkey" FOREIGN KEY ("Id_Remito") REFERENCES public."Remito"("Id_Remito") ON UPDATE CASCADE;


--
-- Name: Remito Remito_Id_Estado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Remito"
    ADD CONSTRAINT "Remito_Id_Estado_fkey" FOREIGN KEY ("Id_Estado") REFERENCES public."Estados"("Id_Estado") ON UPDATE CASCADE;


--
-- Name: VentasMercaderia VentasMercaderia_id_Producto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."VentasMercaderia"
    ADD CONSTRAINT "VentasMercaderia_id_Producto_fkey" FOREIGN KEY ("id_Producto") REFERENCES public."Productos"("Id_Producto") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

