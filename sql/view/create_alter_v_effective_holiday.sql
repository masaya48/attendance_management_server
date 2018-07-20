CREATE OR REPLACE VIEW v_effective_holiday
AS
SELECT
    *
FROM
    t_own_holiday AS own
WHERE
    CURRENT_DATE < end_date
