import { url } from 'inspector'
import React from 'react'
import { API } from '../../config'

interface ChampSpellCardProps {
    URL: string;
    data: any;
}
export const ChampSpellCard: React.FC<ChampSpellCardProps> = ({ data, URL }) => {
    return (
        <div className="champSpellCard">
            <img className="champ-image" src={`${URL}/${data.image.full}`} alt="images" />
            <div className="passive__description"></div>
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
