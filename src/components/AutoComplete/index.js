//material
import { styled } from '@material-ui/core/styles';
import { Autocomplete, TextField } from '@material-ui/core';

const AutocompleteSearch = styled(Autocomplete)(({ theme }) => ({ width: 260, marginRight: 10 }));

const ComboBoxAutoComplete = ({ label, data, option, onChangeOption }) => {
  return (
    <AutocompleteSearch
      options={data || []}
      getOptionLabel={(option) => option.name}
      value={option}
      onChange={(event, newValue) => {
        onChangeOption(newValue);
      }}
      renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
    />
  );
};

export default ComboBoxAutoComplete;
