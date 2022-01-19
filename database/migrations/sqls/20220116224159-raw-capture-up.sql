CREATE TABLE raw_capture
(
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id uuid NOT NULL REFERENCES session(id),
    field_user_id uuid NOT NULL,
    field_user_photo_url varchar NOT NULL,
    field_user_username varchar NOT NULL,
    reference_id int,
    lat numeric NOT NULL,
    lon numeric NOT NULL,
    gps_accuracy int NOT NULL,
    note varchar,
    abs_step_count int NOT NULL,
    delta_step_count int NOT NULL,
    rotation_matrix int[] NOT NULL,
    extra_attributes jsonb,
    capture_taken_at timestamptz NOT NULL,
    status varchar NOT NULL,
    rejection_reason varchar,
    created_at timestamptz NOT NULL,
    updated_at timestamptz NOT NULL
);
