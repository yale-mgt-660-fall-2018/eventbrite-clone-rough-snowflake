--DROP TABLE IF EXISTS events CASCADE;
CREATE TABLE IF NOT EXISTS events (
    -- Integer primary key for events
    id serial PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    -- 'date' is a reserved word in some SQL dialects.
    -- Here I quoted it to make sure it is interpreted
    -- as a column name.
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    -- The 'image_url' must be a URL ending in png, gif.
    image_url TEXT NOT NULL
        CHECK ( image_url ~* '^https?://.*\.(png|gif|jpg)$' ),
    "location" TEXT NOT NULL,
    -- Record the time at which this event was created
    created_at TIMESTAMP WITH TIME ZONE
        NOT NULL
        DEFAULT current_timestamp
);

--DROP TABLE IF EXISTS attendees CASCADE;
CREATE TABLE IF NOT EXISTS attendees (
    event_id INT NOT NULL,
    email TEXT
     CHECK (email ~* '%*@yale.edu' ),
    UNIQUE(event_id,email)
);

--DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    referer TEXT NOT NULL,
    visit_date TIMESTAMP WITH TIME ZONE
);

--DROP TABLE IF EXISTS pageviews CASCADE;
CREATE TABLE IF NOT EXISTS pageviews (
    user_id INT NOT NULL,
    p TEXT NOT NULL,
    visit_date TIMESTAMP WITH TIME ZONE
);