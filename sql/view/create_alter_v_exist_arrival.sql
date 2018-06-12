CREATE OR REPLACE VIEW v_exist_arrival
AS
SELECT
    TA.user_no,
    MAX(TA.attendance_no) AS attendance_no,
    COUNT(*) AS count,
    null AS created_at,
    null AS updated_at
FROM
    t_attendance AS TA
WHERE
    TA.end_time IS NULL
GROUP BY
    TA.user_no
