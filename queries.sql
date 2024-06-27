CREATE TABLE IF NOT EXISTS public.usuario
(
    id_usuario integer NOT NULL DEFAULT nextval('usuario_id_usuario_seq'::regclass),
    matricula integer NOT NULL,
    nombre text NOT NULL,
    username text NOT NULL,
    apellidos text NOT NULL,
    movil integer NOT NULL,
    "contraseña" text  NOT NULL,
    cargo text NOT NULL,
    departamento text,
    grupo text,
    turno text,
    admin boolean NOT NULL,
    CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario)
);

CREATE TABLE IF NOT EXISTS public.insumo
(
    id_insumo integer NOT NULL DEFAULT nextval('insumo_id_insumo_seq'::regclass),
    clave text NOT NULL,
    nombre text NOT NULL,
    estado text NOT NULL,
    observacion text NOT NULL,
    CONSTRAINT insumo_pkey PRIMARY KEY (id_insumo)
);

CREATE TABLE public.prestamo
(
    id_prestamo serial NOT NULL,
    id_usuario integer NOT NULL,
    fecha_entrega date NOT NULL,
    fecha_devolucion date NOT NULL,
    PRIMARY KEY (id_prestamo),
    FOREIGN KEY (id_usuario)
        REFERENCES public.usuario (id_usuario) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

CREATE TABLE public.prestamo_insumo
(
    id_prestamo_insumo serial NOT NULL,
    id_prestamo integer NOT NULL,
    nombre text NOT NULL,
    cantidad integer NOT NULL,
    PRIMARY KEY (id_prestamo_insumo),
    FOREIGN KEY (id_prestamo)
        REFERENCES public.prestamo (id_prestamo) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);
