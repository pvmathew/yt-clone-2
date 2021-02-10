-- create user table
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    id_session INT,
    t_email VARCHAR(128),
    t_password VARCHAR(128),
    t_name_user VARCHAR(64),
    t_name_first VARCHAR(64),
    t_name_last VARCHAR(64),
    t_phone VARCHAR(32),
    t_ip_address VARCHAR(32),
    i_security_level INT,
    d_visit_first DATE,
    d_visit_last DATE,
    b_enabled BOOL,
    a_liked INT[]
);

-- create video table
CREATE TABLE videos(
    id SERIAL PRIMARY KEY,
    t_name_video VARCHAR(64),
    t_name_user VARCHAR(64),
    t_desc VARCHAR(256),
    d_upload_date DATE,
    d_latest_edit DATE,
    i_num_views INT,
    i_num_likes INT,
);

-- register new user
INSERT INTO users
    (t_email, t_password, t_name_user) VALUES ($1,$2,$3) RETURNING *
WHERE
    NOT EXISTS (
        SELECT t_email FROM users
        WHERE t_email != $1
    );