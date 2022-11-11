import PropTypes from "prop-types";
// material
import { Paper, Typography } from "@mui/material";

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
};

export default function SearchNotFound({ searchQuery = "", ...other }) {
  return (
    <Paper {...other} sx={{ width: "100%" }}>
      <Typography gutterBottom align="center" variant="subtitle1">
        غير موجود !
      </Typography>
      <Typography variant="body2" align="center">
        لم يتم العثور على نتائج لـ &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. يرجى التأكد من صحة كتابة
        كلمات البحث.
      </Typography>
    </Paper>
  );
}
