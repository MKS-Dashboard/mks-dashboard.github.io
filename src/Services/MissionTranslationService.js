import React from 'react'
import { lists_Codetranslations } from '../Lists/missions';


export function MissionTranslationService_Requirments_personnel_educations(data) {
    console.log(data.toString())
    var founddata = []
    for (var key in data) {
        var value = data[key];
        founddata.push({ a: key, b: value })
    }

    return (
        <li>Benodigde opgeleide personeelsleden:
            <ul>
                {(() => {
                    return (
                        founddata.map((edu) => {
                            return (
                                <li>{`${lists_Codetranslations[0].personnel_educations[edu.a] !== undefined ? lists_Codetranslations[0].personnel_educations[edu.a] : edu.a}: ${edu.b}`}</li>
                            )
                        }
                        ))
                })()}
            </ul>
        </li>
    )
}