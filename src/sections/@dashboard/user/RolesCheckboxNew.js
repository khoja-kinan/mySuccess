import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useEffect } from "react";
import useState from "react-usestateref";
import axios from "axios";
import CircularIndeterminate from "./CircularIndeterminate";
import { useTranslation } from "react-i18next";

export default function FormControlLabelPosition({
  privilegeRolesList,
  setPrivilegeDetailsNew,
}) {
  const [isLoading1, setIsLoading1] = useState(true);
  const [PrivilegeDetails, setPrivilegeDetails, PrivilegeDetailsref] = useState(
    []
  );
  const { t } = useTranslation();

  const handleChange = (event) => {
    let temp = parseInt(event.target.value);
    PrivilegeDetailsref.current.includes(temp)
      ? setPrivilegeDetails(
          PrivilegeDetailsref.current.filter((item) => item !== temp)
        )
      : setPrivilegeDetails([...PrivilegeDetailsref.current, temp]);
    setPrivilegeDetailsNew(PrivilegeDetailsref.current);
  };
  return (
    <>
      <FormLabel component="legend" sx={{ marginBottom: 1, marginTop: 3 }}>
        {t("description.NewPrivilegeRolesTitle")} :
      </FormLabel>
      {Object.entries(privilegeRolesList).map((Privilege) => (
        <FormControl component="fieldset" key={Privilege[0]}>
          <FormLabel component="legend">{Privilege[0]}</FormLabel>
          {Privilege[1].map((pri) => (
            <FormGroup aria-label="position" row key={pri.id}>
              <FormControlLabel
                value={pri.id}
                control={
                  <Checkbox
                    checked={PrivilegeDetailsref.current.indexOf(pri.id) !== -1}
                    onChange={handleChange}
                    value={pri.id}
                  />
                }
                label={pri.code}
                labelPlacement="end"
              />
            </FormGroup>
          ))}
        </FormControl>
      ))}
    </>
  );
}
