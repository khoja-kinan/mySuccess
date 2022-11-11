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
  Privilege_RolesURL,
  token,
  Privilege_Id,
  privilegeRolesList,
  setPrivilegeDetailsProp,
}) {
  const [isLoading1, setIsLoading1] = useState(true);
  const [PrivilegeDetails, setPrivilegeDetails, PrivilegeDetailsref] = useState(
    []
  );
  const { t } = useTranslation();
  useEffect(() => {
    async function fecthData() {
      await axios
        .get(`${Privilege_RolesURL}/${Privilege_Id}`, {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const data = response.data;
            if (data.status === 1) {
              let result = data.privilege.roles;

              setPrivilegeDetails(result);
              setIsLoading1(false);
            }
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
    fecthData();
  }, []);
  const handleChange = (event) => {
    let temp = parseInt(event.target.value);
    PrivilegeDetailsref.current.includes(temp)
      ? setPrivilegeDetails(
          PrivilegeDetailsref.current.filter((item) => item !== temp)
        )
      : setPrivilegeDetails([...PrivilegeDetailsref.current, temp]);
    setPrivilegeDetailsProp(PrivilegeDetailsref.current);
  };
  return (
    <>
      {isLoading1 ? (
        <CircularIndeterminate />
      ) : (
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
                        checked={
                          PrivilegeDetailsref.current.indexOf(pri.id) !== -1
                        }
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
      )}
    </>
  );
}
