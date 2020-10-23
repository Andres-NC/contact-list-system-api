--
-- PostgreSQL database dump
--

-- Dumped from database version 13.0
-- Dumped by pg_dump version 13.0

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
-- Name: contacts; Type: TABLE; Schema: public; Owner: andres
--

CREATE TABLE public.contacts (
    id integer NOT NULL,
    firstname character varying(40),
    lastname character varying(40),
    email character varying(40),
    contactnumber character varying(20),
    user_id integer
);


ALTER TABLE public.contacts OWNER TO andres;

--
-- Name: contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: andres
--

CREATE SEQUENCE public.contacts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contacts_id_seq OWNER TO andres;

--
-- Name: contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: andres
--

ALTER SEQUENCE public.contacts_id_seq OWNED BY public.contacts.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: andres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(40) NOT NULL,
    password text NOT NULL,
    email character varying(40) NOT NULL
);


ALTER TABLE public.users OWNER TO andres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: andres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO andres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: andres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: contacts id; Type: DEFAULT; Schema: public; Owner: andres
--

ALTER TABLE ONLY public.contacts ALTER COLUMN id SET DEFAULT nextval('public.contacts_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: andres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: andres
--

COPY public.contacts (id, firstname, lastname, email, contactnumber, user_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: andres
--

COPY public.users (id, name, password, email) FROM stdin;
13	andres	$2b$10$Y93XHpusBE4CucJDFOwrC.kpVkGe8bpR5z2Q0cpa8S.oOsV4aaA5e	andres@correo.net
\.


--
-- Name: contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: andres
--

SELECT pg_catalog.setval('public.contacts_id_seq', 28, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: andres
--

SELECT pg_catalog.setval('public.users_id_seq', 17, true);


--
-- Name: contacts contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: andres
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: andres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: andres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: contacts contacts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: andres
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

