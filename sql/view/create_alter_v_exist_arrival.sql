CREATE OR REPLACE VIEW v_exist_arrival
AS
SELECT
    ta.user_no,
    MAX(ta.attendance_no) AS attendance_no,
    COUNT(*) AS count,
    null AS created_at,
    null AS updated_at
FROM
    t_attendance AS ta
WHERE
    ta.end_time IS NULL
GROUP BY
    ta.user_no
