import { RotationChampEachType } from '../types'
import { Tooltip } from '@material-ui/core'
import { MuiThemeProvider } from "@material-ui/core/styles";
import { API } from '../config';
import { theme } from '../libs';

interface ChampionRotationCardViewProps {
    champ: RotationChampEachType;
}
export const ChampionRotationCardView: React.FC<ChampionRotationCardViewProps> = ({ champ }) => {



    const spellDes = (data: RotationChampEachType) => {
        return (
            <>
                <div className="spellName" style={{ color: "#3273fa", fontSize: "15px", marginBottom: "20px" }}>{data.name}</div>
                {
                    data.tags.join(", ")
                }
            </>
        )
    }


    return (
        <MuiThemeProvider theme={theme}>
            <Tooltip title={spellDes(champ)} arrow>
                <img className="champ-image" src={`${API.GET_CHAMPION_SQUARE_IMG}/${champ.id}.png`} alt="images" />
            </Tooltip>
        </MuiThemeProvider>
    )
}

