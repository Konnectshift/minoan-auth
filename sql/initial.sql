 create extension citext;


create sequence staff_id_seq increment by 1 start with 1;

CREATE TABLE  staff (
    id integer DEFAULT nextval('staff_id_seq'::regclass) NOT NULL,
       name varchar(255) NOT NULL,
       email citext NOT NULL,
       password varchar(255) NOT NULL,
       contact_number varchar(255) NOT NULL,
       last_login_timestamp timestamp(0) DEFAULT NULL,
       status boolean NOT NULL DEFAULT TRUE,
       role_id smallint NOT NULL DEFAULT 0,
       timezone_id smallint NOT NULL DEFAULT 33,
       deleted_at timestamp(0) DEFAULT NULL,
    created_at timestamp(0) without time zone DEFAULT ('now'::text)::timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone DEFAULT ('now'::text)::timestamp(0) without time zone NOT NULL
);

ALTER TABLE ONLY public.staff
    ADD CONSTRAINT staff_pkey PRIMARY KEY (id);



create sequence super_admin_id_seq increment by 1 start with 1;

CREATE TABLE  super_admin (
    id integer DEFAULT nextval('super_admin_id_seq'::regclass) NOT NULL,
       name varchar(255) NOT NULL,
       email citext NOT NULL,
       password varchar(255) NOT NULL,
       contact_number varchar(255) NOT NULL,
       last_login_timestamp timestamp(0) DEFAULT NULL,
       is_enabled boolean NOT NULL DEFAULT TRUE,
       timezone_id smallint NOT NULL DEFAULT 33,
    created_at timestamp(0) without time zone DEFAULT ('now'::text)::timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone DEFAULT ('now'::text)::timestamp(0) without time zone NOT NULL
);

ALTER TABLE ONLY public.super_admin
    ADD CONSTRAINT super_admin_pkey PRIMARY KEY (id);


INSERT INTO public.super_admin (name, email, password, contact_number) VALUES ('admin','admin@minoan.com', '', '');
