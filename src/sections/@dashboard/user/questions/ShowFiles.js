import { useRef, useState } from "react";
/* import { Link as RouterLink } from "react-router-dom"; */
// material
import {
  IconButton,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
} from "@mui/material";
// component
import Iconify from "../../../../components/Iconify";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";
import { storageUrl } from "../../../../constants/urls";
// ----------------------------------------------------------------------

export default function ShowFiles({ user }) {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="bi:eye-fill" width={20} height={20} />
      </IconButton>

      <Dialog
        disableEscapeKeyDown
        open={isOpen}
        fullWidth
        onClose={() => setIsOpen(false)}
      >
        <DialogTitle>مرفقات السؤال</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ width: "100%" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align={i18n.dir() === "ltr" ? "left" : "right"}>
                    #
                  </TableCell>
                  <TableCell align={i18n.dir() === "ltr" ? "right" : "left"}>
                    عرض المرفق
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.files.length === 0
                  ? " لا يوجد مرفقات لعرضها"
                  : user.files.map((item, index) => (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        key={index}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          align={i18n.dir() === "ltr" ? "left" : "right"}
                        >
                          مرفق {index + 1}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align={i18n.dir() === "ltr" ? "right" : "left"}
                        >
                          <Link
                            href={`${storageUrl}${item.path}`}
                            sx={{ textDecoration: "none", color: "#637381" }}
                            target="_blank"
                          >
                            <Iconify
                              icon="bi:eye-fill"
                              width={20}
                              height={20}
                            />
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </>
  );
}
