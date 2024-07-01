CREATE TABLE
    IF NOT EXISTS public.usuario (
        id_usuario serial NOT NULL,
        matricula integer NOT NULL,
        nombre text NOT NULL,
        username text NOT NULL,
        apellidos text NOT NULL,
        movil integer NOT NULL,
        "contraseña" text NOT NULL,
        cargo text NOT NULL,
        departamento text,
        grupo text,
        turno text,
        admin boolean NOT NULL,
        CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario)
    );

CREATE TABLE
    IF NOT EXISTS public.insumo (
        id_insumo serial NOT NULL,
        clave text NOT NULL,
        nombre text NOT NULL,
        estado text NOT NULL,
        observacion text NOT NULL,
        CONSTRAINT insumo_pkey PRIMARY KEY (id_insumo)
    );

CREATE TABLE
    public.prestamo (
        id_prestamo serial NOT NULL,
        id_usuario integer NOT NULL,
        fecha_entrega date NOT NULL,
        fecha_devolucion date NOT NULL,
        estado text NOT NULL,
        PRIMARY KEY (id_prestamo),
        FOREIGN KEY (id_usuario) REFERENCES public.usuario (id_usuario) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID
    );

CREATE TABLE
    public.prestamo_insumo (
        id_prestamo_insumo serial NOT NULL,
        id_prestamo integer NOT NULL,
        nombre text NOT NULL,
        cantidad integer NOT NULL,
        PRIMARY KEY (id_prestamo_insumo),
        FOREIGN KEY (id_prestamo) REFERENCES public.prestamo (id_prestamo) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID
    );

CREATE TABLE 
    public.blacklist (
        id_blacklist serial NOT NULL,
        id_usuario integer NOT NULL,
        PRIMARY KEY (id_blacklist),
        FOREIGN KEY (id_usuario) REFERENCES public.usuario (id_usuario) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID
    );

INSERT INTO
    insumo (clave, nombre, estado, observacion)
VALUES
    ('mul1', 'Multimetro', 'libre', 'sin observacion'),
    ('mul2', 'Multimetro', 'libre', 'sin observacion'),
    ('mul3', 'Multimetro', 'libre', 'sin observacion'),
    ('mul4', 'Multimetro', 'libre', 'sin observacion'),
    ('mul5', 'Multimetro', 'libre', 'sin observacion'),
    ('mul6', 'Multimetro', 'libre', 'sin observacion'),
    ('mul7', 'Multimetro', 'libre', 'sin observacion'),
    ('mul8', 'Multimetro', 'libre', 'sin observacion'),
    ('mul9', 'Multimetro', 'libre', 'sin observacion'),
    ('mul10', 'Multimetro', 'libre', 'sin observacion'),
    ('mul11', 'Multimetro', 'libre', 'sin observacion'),
    ('mul12', 'Multimetro', 'libre', 'sin observacion'),
    ('mul13', 'Multimetro', 'libre', 'sin observacion'),
    ('mul14', 'Multimetro', 'libre', 'sin observacion'),
    ('mul15', 'Multimetro', 'libre', 'sin observacion'),
    (
        'osc1',
        'Osciloscopio',
        'libre',
        'sin observacion'
    ),
    (
        'osc2',
        'Osciloscopio',
        'libre',
        'sin observacion'
    ),
    (
        'osc3',
        'Osciloscopio',
        'libre',
        'sin observacion'
    ),
    (
        'osc4',
        'Osciloscopio',
        'libre',
        'sin observacion'
    ),
    (
        'osc5',
        'Osciloscopio',
        'libre',
        'sin observacion'
    ),
    (
        'osc6',
        'Osciloscopio',
        'libre',
        'sin observacion'
    ),
    (
        'osc7',
        'Osciloscopio',
        'libre',
        'sin observacion'
    ),
    (
        'osc8',
        'Osciloscopio',
        'libre',
        'sin observacion'
    ),
    (
        'osc9',
        'Osciloscopio',
        'libre',
        'sin observacion'
    ),
    (
        'osc10',
        'Osciloscopio',
        'libre',
        'sin observacion'
    ),
    (
        'osc11',
        'Osciloscopio',
        'libre',
        'sin observacion'
    ),
    (
        'osc12',
        'Osciloscopio',
        'libre',
        'sin observacion'
    ),
    (
        'osc13',
        'Osciloscopio',
        'libre',
        'sin observacion'
    ),
    (
        'osc14',
        'Osciloscopio',
        'libre',
        'sin observacion'
    ),
    (
        'osc15',
        'Osciloscopio',
        'libre',
        'sin observacion'
    ),
    (
        'fue1',
        'Fuente de alimentacion',
        'libre',
        'sin observacion'
    ),
    (
        'fue2',
        'Fuente de alimentacion',
        'libre',
        'sin observacion'
    ),
    (
        'fue3',
        'Fuente de alimentacion',
        'libre',
        'sin observacion'
    ),
    (
        'fue4',
        'Fuente de alimentacion',
        'libre',
        'sin observacion'
    ),
    (
        'fue5',
        'Fuente de alimentacion',
        'libre',
        'sin observacion'
    ),
    (
        'fue6',
        'Fuente de alimentacion',
        'libre',
        'sin observacion'
    ),
    (
        'fue7',
        'Fuente de alimentacion',
        'libre',
        'sin observacion'
    ),
    (
        'fue8',
        'Fuente de alimentacion',
        'libre',
        'sin observacion'
    ),
    (
        'fue9',
        'Fuente de alimentacion',
        'libre',
        'sin observacion'
    ),
    (
        'fue10',
        'Fuente de alimentacion',
        'libre',
        'sin observacion'
    ),
    (
        'fue11',
        'Fuente de alimentacion',
        'libre',
        'sin observacion'
    ),
    (
        'fue12',
        'Fuente de alimentacion',
        'libre',
        'sin observacion'
    ),
    (
        'fue13',
        'Fuente de alimentacion',
        'libre',
        'sin observacion'
    ),
    (
        'fue14',
        'Fuente de alimentacion',
        'libre',
        'sin observacion'
    ),
    (
        'fue15',
        'Fuente de alimentacion',
        'libre',
        'sin observacion'
    ),
    ('bal1', 'Balanza', 'libre', 'sin observacion'),
    ('bal2', 'Balanza', 'libre', 'sin observacion'),
    ('bal3', 'Balanza', 'libre', 'sin observacion'),
    ('bal4', 'Balanza', 'libre', 'sin observacion'),
    ('bal5', 'Balanza', 'libre', 'sin observacion'),
    ('bal6', 'Balanza', 'libre', 'sin observacion'),
    ('bal7', 'Balanza', 'libre', 'sin observacion'),
    ('bal8', 'Balanza', 'libre', 'sin observacion'),
    ('bal9', 'Balanza', 'libre', 'sin observacion'),
    ('bal10', 'Balanza', 'libre', 'sin observacion'),
    ('bal11', 'Balanza', 'libre', 'sin observacion'),
    ('bal12', 'Balanza', 'libre', 'sin observacion'),
    ('bal13', 'Balanza', 'libre', 'sin observacion'),
    ('bal14', 'Balanza', 'libre', 'sin observacion'),
    ('bal15', 'Balanza', 'libre', 'sin observacion'),
    ('pro1', 'Probeta', 'libre', 'sin observacion'),
    ('pro2', 'Probeta', 'libre', 'sin observacion'),
    ('pro3', 'Probeta', 'libre', 'sin observacion'),
    ('pro4', 'Probeta', 'libre', 'sin observacion'),
    ('pro5', 'Probeta', 'libre', 'sin observacion'),
    ('pro6', 'Probeta', 'libre', 'sin observacion'),
    ('pro7', 'Probeta', 'libre', 'sin observacion'),
    ('pro8', 'Probeta', 'libre', 'sin observacion'),
    ('pro9', 'Probeta', 'libre', 'sin observacion'),
    ('pro10', 'Probeta', 'libre', 'sin observacion'),
    ('pro11', 'Probeta', 'libre', 'sin observacion'),
    ('pro12', 'Probeta', 'libre', 'sin observacion'),
    ('pro13', 'Probeta', 'libre', 'sin observacion'),
    ('pro14', 'Probeta', 'libre', 'sin observacion'),
    ('pro15', 'Probeta', 'libre', 'sin observacion'),
    ('pro16', 'Probeta', 'libre', 'sin observacion'),
    ('pro17', 'Probeta', 'libre', 'sin observacion'),
    ('pro18', 'Probeta', 'libre', 'sin observacion'),
    ('pro19', 'Probeta', 'libre', 'sin observacion'),
    ('pro20', 'Probeta', 'libre', 'sin observacion'),
    ('pro21', 'Probeta', 'libre', 'sin observacion'),
    ('pro22', 'Probeta', 'libre', 'sin observacion'),
    ('pro23', 'Probeta', 'libre', 'sin observacion'),
    ('pro24', 'Probeta', 'libre', 'sin observacion'),
    ('pro25', 'Probeta', 'libre', 'sin observacion'),
    ('mat1', 'Matraz', 'libre', 'sin observacion'),
    ('mat2', 'Matraz', 'libre', 'sin observacion'),
    ('mat3', 'Matraz', 'libre', 'sin observacion'),
    ('mat4', 'Matraz', 'libre', 'sin observacion'),
    ('mat5', 'Matraz', 'libre', 'sin observacion'),
    ('mat6', 'Matraz', 'libre', 'sin observacion'),
    ('mat7', 'Matraz', 'libre', 'sin observacion'),
    ('mat8', 'Matraz', 'libre', 'sin observacion'),
    ('mat9', 'Matraz', 'libre', 'sin observacion'),
    ('mat10', 'Matraz', 'libre', 'sin observacion'),
    ('mat11', 'Matraz', 'libre', 'sin observacion'),
    ('mat12', 'Matraz', 'libre', 'sin observacion'),
    ('mat13', 'Matraz', 'libre', 'sin observacion'),
    ('mat14', 'Matraz', 'libre', 'sin observacion'),
    ('mat15', 'Matraz', 'libre', 'sin observacion'),
    ('mat16', 'Matraz', 'libre', 'sin observacion'),
    ('mat17', 'Matraz', 'libre', 'sin observacion'),
    ('mat18', 'Matraz', 'libre', 'sin observacion'),
    ('mat19', 'Matraz', 'libre', 'sin observacion'),
    ('mat20', 'Matraz', 'libre', 'sin observacion'),
    ('mat21', 'Matraz', 'libre', 'sin observacion'),
    ('mat22', 'Matraz', 'libre', 'sin observacion'),
    ('mat23', 'Matraz', 'libre', 'sin observacion'),
    ('mat24', 'Matraz', 'libre', 'sin observacion'),
    ('mat25', 'Matraz', 'libre', 'sin observacion'),
    (
        'tub1',
        'Tubo de ensayo',
        'libre',
        'sin observacion'
    ),
    (
        'tub2',
        'Tubo de ensayo',
        'libre',
        'sin observacion'
    ),
    (
        'tub3',
        'Tubo de ensayo',
        'libre',
        'sin observacion'
    ),
    (
        'tub4',
        'Tubo de ensayo',
        'libre',
        'sin observacion'
    ),
    (
        'tub5',
        'Tubo de ensayo',
        'libre',
        'sin observacion'
    ),
    (
        'tub6',
        'Tubo de ensayo',
        'libre',
        'sin observacion'
    ),
    (
        'tub7',
        'Tubo de ensayo',
        'libre',
        'sin observacion'
    ),
    (
        'tub8',
        'Tubo de ensayo',
        'libre',
        'sin observacion'
    ),
    (
        'tub9',
        'Tubo de ensayo',
        'libre',
        'sin observacion'
    ),
    (
        'tub10',
        'Tubo de ensayo',
        'libre',
        'sin observacion'
    ),
    (
        'tub11',
        'Tubo de ensayo',
        'libre',
        'sin observacion'
    ),
    (
        'tub12',
        'Tubo de ensayo',
        'libre',
        'sin observacion'
    ),
    (
        'tub13',
        'Tubo de ensayo',
        'libre',
        'sin observacion'
    ),
    (
        'tub14',
        'Tubo de ensayo',
        'libre',
        'sin observacion'
    ),
    (
        'tub15',
        'Tubo de ensayo',
        'libre',
        'sin observacion'
    ),
    (
        'tub16',
        'Tubo de ensayo',
        'libre',
        'sin observacion'
    ),
    (
        'tub17',
        'Tubo de ensayo',
        'libre',
        'sin observacion'
    ),
    (
        'tub18',
        'Tubo de ensayo',
        'libre',
        'sin observacion'
    ),
    (
        'tub19',
        'Tubo de ensayo',
        'libre',
        'sin observacion'
    ),
    (
        'tub20',
        'Tubo de ensayo',
        'libre',
        'sin observacion'
    ),
    (
        'tub21',
        'Tubo de ensayo',
        'libre',
        'sin observacion'
    ),
    (
        'tub22',
        'Tubo de ensayo',
        'libre',
        'sin observacion'
    ),
    (
        'tub23',
        'Tubo de ensayo',
        'libre',
        'sin observacion'
    ),
    (
        'tub24',
        'Tubo de ensayo',
        'libre',
        'sin observacion'
    ),
    (
        'tub25',
        'Tubo de ensayo',
        'libre',
        'sin observacion'
    ),
    (
        'mec1',
        'Mechero Bunsen',
        'libre',
        'sin observacion'
    ),
    (
        'mec2',
        'Mechero Bunsen',
        'libre',
        'sin observacion'
    ),
    (
        'mec3',
        'Mechero Bunsen',
        'libre',
        'sin observacion'
    ),
    (
        'mec4',
        'Mechero Bunsen',
        'libre',
        'sin observacion'
    ),
    (
        'mec5',
        'Mechero Bunsen',
        'libre',
        'sin observacion'
    ),
    (
        'mec6',
        'Mechero Bunsen',
        'libre',
        'sin observacion'
    ),
    (
        'mec7',
        'Mechero Bunsen',
        'libre',
        'sin observacion'
    ),
    (
        'mec8',
        'Mechero Bunsen',
        'libre',
        'sin observacion'
    ),
    (
        'mec9',
        'Mechero Bunsen',
        'libre',
        'sin observacion'
    ),
    (
        'mec10',
        'Mechero Bunsen',
        'libre',
        'sin observacion'
    ),
    (
        'mec11',
        'Mechero Bunsen',
        'libre',
        'sin observacion'
    ),
    (
        'mec12',
        'Mechero Bunsen',
        'libre',
        'sin observacion'
    ),
    (
        'mec13',
        'Mechero Bunsen',
        'libre',
        'sin observacion'
    ),
    (
        'mec14',
        'Mechero Bunsen',
        'libre',
        'sin observacion'
    ),
    (
        'mec15',
        'Mechero Bunsen',
        'libre',
        'sin observacion'
    ),
    ('mic1', 'Microscopio', 'libre', 'sin observacion'),
    ('mic2', 'Microscopio', 'libre', 'sin observacion'),
    ('mic3', 'Microscopio', 'libre', 'sin observacion'),
    ('mic4', 'Microscopio', 'libre', 'sin observacion'),
    ('mic5', 'Microscopio', 'libre', 'sin observacion'),
    ('mic6', 'Microscopio', 'libre', 'sin observacion'),
    ('mic7', 'Microscopio', 'libre', 'sin observacion'),
    ('mic8', 'Microscopio', 'libre', 'sin observacion'),
    ('mic9', 'Microscopio', 'libre', 'sin observacion'),
    (
        'mic10',
        'Microscopio',
        'libre',
        'sin observacion'
    ),
    (
        'mic11',
        'Microscopio',
        'libre',
        'sin observacion'
    ),
    (
        'mic12',
        'Microscopio',
        'libre',
        'sin observacion'
    ),
    (
        'mic13',
        'Microscopio',
        'libre',
        'sin observacion'
    ),
    (
        'mic14',
        'Microscopio',
        'libre',
        'sin observacion'
    ),
    (
        'mic15',
        'Microscopio',
        'libre',
        'sin observacion'
    );