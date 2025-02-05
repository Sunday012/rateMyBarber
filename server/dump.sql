PGDMP      2                |            rate_my_barber    16.3    16.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    24646    rate_my_barber    DATABASE     �   CREATE DATABASE rate_my_barber WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE rate_my_barber;
                postgres    false            �            1259    24648    barbers    TABLE     0  CREATE TABLE public.barbers (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    user_id integer,
    location character varying(255),
    barber_shop_name character varying(255),
    expertise character varying(255),
    phone_number text,
    account_name character varying(255)
);
    DROP TABLE public.barbers;
       public         heap    postgres    false            �            1259    24647    barbers_id_seq    SEQUENCE     �   CREATE SEQUENCE public.barbers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.barbers_id_seq;
       public          postgres    false    216            �           0    0    barbers_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.barbers_id_seq OWNED BY public.barbers.id;
          public          postgres    false    215            �            1259    24667    reviews    TABLE     m  CREATE TABLE public.reviews (
    id integer NOT NULL,
    user_id integer,
    barber_id integer,
    rating integer,
    review_text text,
    review_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    image_url character varying(255),
    style character varying(255),
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);
    DROP TABLE public.reviews;
       public         heap    postgres    false            �            1259    24666    reviews_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.reviews_id_seq;
       public          postgres    false    220            �           0    0    reviews_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;
          public          postgres    false    219            �            1259    24655    users    TABLE     �  CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    role character varying(50),
    account_name character varying(255),
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['barber'::character varying, 'customer'::character varying])::text[])))
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    24654    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    218            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    217            $           2604    24651 
   barbers id    DEFAULT     h   ALTER TABLE ONLY public.barbers ALTER COLUMN id SET DEFAULT nextval('public.barbers_id_seq'::regclass);
 9   ALTER TABLE public.barbers ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            '           2604    24670 
   reviews id    DEFAULT     h   ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);
 9   ALTER TABLE public.reviews ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            %           2604    24658    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            �          0    24648    barbers 
   TABLE DATA           w   COPY public.barbers (id, name, user_id, location, barber_shop_name, expertise, phone_number, account_name) FROM stdin;
    public          postgres    false    216   �!       �          0    24667    reviews 
   TABLE DATA           m   COPY public.reviews (id, user_id, barber_id, rating, review_text, review_date, image_url, style) FROM stdin;
    public          postgres    false    220   }"       �          0    24655    users 
   TABLE DATA           Z   COPY public.users (id, name, email, password, created_at, role, account_name) FROM stdin;
    public          postgres    false    218   #       �           0    0    barbers_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.barbers_id_seq', 8, true);
          public          postgres    false    215            �           0    0    reviews_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.reviews_id_seq', 3, true);
          public          postgres    false    219            �           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 8, true);
          public          postgres    false    217            ,           2606    24653    barbers barbers_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.barbers
    ADD CONSTRAINT barbers_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.barbers DROP CONSTRAINT barbers_pkey;
       public            postgres    false    216            2           2606    24676    reviews reviews_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_pkey;
       public            postgres    false    220            .           2606    24665    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    218            0           2606    24663    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    218            3           2606    24689    barbers barbers_user_id_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.barbers
    ADD CONSTRAINT barbers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 F   ALTER TABLE ONLY public.barbers DROP CONSTRAINT barbers_user_id_fkey;
       public          postgres    false    4656    218    216            4           2606    24682    reviews reviews_barber_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_barber_id_fkey FOREIGN KEY (barber_id) REFERENCES public.barbers(id);
 H   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_barber_id_fkey;
       public          postgres    false    4652    220    216            5           2606    24677    reviews reviews_user_id_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 F   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_user_id_fkey;
       public          postgres    false    218    220    4656            �   �   x��б
� ����}��Q�/��d�(�hDh#hҡO_
-ٝ������_y/�F\9�y��X�X"�zm�T�v�y�����T}~B����=x��dXC$�&+�E��[�iA��`0�Jb��GIR��'�Ņ�91��_      �   u   x���1� F���\@�]��9�*�*�06�}�Ik�y���{��]�����-�`ǁG͜�M^��(�@>ZU���1ʖ���>�K}"C18�������[#Id,�^�R�\*y      �   �  x�m��r�0��x�.��*�BB�j'�k��|�Ɍ&j�؀l�L߽ԞNCҝ���7�!`��rU�Re����^����ԗ	��)x�"��;¿d�]q����<�4�e6ڣ�M���QG�ϢG�q�/���bªr9���LO-&٘�`83���ŀ�ތ����kbf��wTٜn���τ=ϔ����B��x�)�<_m�zHճ�gQnD��	<�9�;�n��DS\4�N�U��TQYm��v�����X:�)��*����d}�qďbn_�ܸY<|�\(���Ėߢ4�&1��u������;U]4��d������Ey6�Ð}ͧ�������~=�kk�t�e�Ҫ�\�&���MD i��/�QkOPӴ�;���     