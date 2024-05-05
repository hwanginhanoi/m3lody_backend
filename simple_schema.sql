create database cos30049
    with owner superuser;

create type public.genre as enum ('Anime', 'Classic', 'Angelic', 'Rock');

alter type public.genre owner to superuser;

create table public.users
(
    user_id     serial
        primary key,
    username    varchar(255) not null,
    password    varchar(255) not null,
    email       varchar(255) not null,
    phone_num   varchar(255) not null,
    description varchar(255) not null,
    address     varchar(255) not null,
    language    varchar(255) not null,
    avatar_url  varchar(255) not null
);

alter table public.users
    owner to superuser;

create table public.music
(
    music_id    serial
        primary key,
    title       varchar(255) not null,
    description text,
    tag         genre,
    music_url   text,
    owner_id    integer
        references public.users,
    price       numeric      not null,
    picture_url text,
    author      varchar(255)
);

alter table public.music
    owner to superuser;

create table public.wallet
(
    wallet_id      serial
        primary key,
    user_id        integer
        references public.users,
    wallet_address varchar(255)                        not null
        unique,
    eth_balance    numeric   default 0                 not null,
    created_at     timestamp default CURRENT_TIMESTAMP not null
);

alter table public.wallet
    owner to superuser;

create table public.transactions
(
    transaction_id   serial
        primary key,
    buyer_id         integer
        references public.users,
    seller_id        integer
        references public.users,
    music_id         integer
        references public.music,
    token_id         varchar(255)                        not null,
    transaction_date timestamp default CURRENT_TIMESTAMP not null
);

alter table public.transactions
    owner to superuser;

create table public.likes
(
    like_id   serial
        primary key,
    user_id   integer
        references public.users,
    music_id  integer
        references public.music,
    timestamp timestamp default CURRENT_TIMESTAMP not null
);

alter table public.likes
    owner to superuser;