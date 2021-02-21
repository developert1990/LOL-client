import { Tooltip } from '@material-ui/core'
import React from 'react'
import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from '../../libs';
interface ChampSpellCardProps {
    URL: string;
    data: any;
}
export const ChampSpellCard: React.FC<ChampSpellCardProps> = ({ data, URL }) => {


    const spellDes = (data: any) => {

        return (
            <>
                <div className="spellName" style={{ color: "#3273fa", fontSize: "15px", marginBottom: "20px" }}>{data.name}</div>
                <span className="spellDescription">{data.description}</span>
            </>
        )
    }

    return (
        <div className="champSpellCard">
            <MuiThemeProvider theme={theme}>
                <Tooltip title={spellDes(data)} arrow>
                    <img className="champ-image" src={`${URL}/${data.image.full}`} alt="images" />
                </Tooltip>
            </MuiThemeProvider>
        </div>
    )
}















// import { url } from 'inspector'
// import React from 'react'
// import { API } from '../../config'

// interface ChampSpellCardProps {
//     URL: string;
//     data: any;
// }
// export const ChampSpellCard: React.FC<ChampSpellCardProps> = ({ data, URL }) => {
//     console.log('data: ', data)

//     return (
//         <div>
//             {
//                 !data.id ?
//                     <>
//                         <img className="champ-image" src={`${API.GET_PASSIVE_IMG}/${data.image.full}`} alt="images" />
//                         <div className="passive__description">

//                         </div>
//                     </>
//                     :
//                     <>
//                         <img className="champ-image" src={`${API.GET_SPELLS_IMG}/${data.image.full}`} alt="images" />
//                         <div className="spells__description">

//                         </div>
//                     </>
//             }
//         </div>
//     )
// }
