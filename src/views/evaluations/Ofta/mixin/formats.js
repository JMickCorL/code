export default {
  methods: {
    fullPostFormat(data = {}) {
      return {
        reason: data.reason,
        plRetina: data.left.posterior.retina,
        prRetina: data.right.posterior.retina,
        plRetinaComments: data.left.posterior.retinaComments,
        prRetinaComments: data.right.posterior.retinaComments,
        plVitreo: data.left.posterior.vitreo,
        prVitreo: data.right.posterior.vitreo,
        plVitreoComments: data.left.posterior.vitreoComments,
        prVitreoComments: data.right.posterior.vitreoComments,
        plCupDisc: data.left.posterior.cupDisc,
        prCupDisc: data.right.posterior.cupDisc,
        plCupDiscComments: data.left.posterior.cupDiscComments,
        prCupDiscComments: data.right.posterior.cupDiscComments,
        plNerve: data.left.posterior.nerve,
        prNerve: data.right.posterior.nerve,
        plNerveComments: data.left.posterior.nerveComments,
        prNerveComments: data.right.posterior.nerveComments,
        plMacula: data.left.posterior.macula,
        prMacula: data.right.posterior.macula,
        plMaculaComments: data.left.posterior.maculaComments,
        prMaculaComments: data.right.posterior.maculaComments,
        plVessel: data.left.posterior.vessel,
        prVessel: data.right.posterior.vessel,
        plVesselComments: data.left.posterior.vesselComments,
        prVesselComments: data.right.posterior.vesselComments,
        plPeriphery: data.left.posterior.periphery,
        prPeriphery: data.right.posterior.periphery,
        plPeripheryComments: data.left.posterior.peripheryComments,
        prPeripheryComments: data.right.posterior.peripheryComments,
        plStatisticalDiagnosisHealthy: data.left.posterior.statisticalDiagnosisHealthy,
        prStatisticalDiagnosisHealthy: data.right.posterior.statisticalDiagnosisHealthy,
        plStatisticalDiagnosisSquint: data.left.posterior.statisticalDiagnosisSquint,
        prStatisticalDiagnosisSquint: data.right.posterior.statisticalDiagnosisSquint,
        plStatisticalDiagnosisCataracts: data.left.posterior.statisticalDiagnosisCataracts,
        prStatisticalDiagnosisCataracts: data.right.posterior.statisticalDiagnosisCataracts,
        plStatisticalDiagnosisGlaucoma: data.left.posterior.statisticalDiagnosisGlaucoma,
        prStatisticalDiagnosisGlaucoma: data.right.posterior.statisticalDiagnosisGlaucoma,
        plStatisticalDiagnosisDiabeticRetinopathy: data.left
          .posterior.statisticalDiagnosisDiabeticRetinopathy,
        prStatisticalDiagnosisDiabeticRetinopathy: data.right
          .posterior.statisticalDiagnosisDiabeticRetinopathy,
        plStatisticalDiagnosisCornealTransplant: data.left
          .posterior.statisticalDiagnosisCornealTransplant,
        prStatisticalDiagnosisCornealTransplant: data.left
          .posterior.statisticalDiagnosisCornealTransplant,
        plStatisticalDiagnosisPostOperated: data.left.posterior.statisticalDiagnosisPostOperated,
        prStatisticalDiagnosisPostOperated: data.left.posterior.statisticalDiagnosisPostOperated,
        plStatisticalDiagnosisOther: data.left.posterior.statisticalDiagnosisOther,
        prStatisticalDiagnosisOther: data.right.posterior.statisticalDiagnosisOther,
        plDiagnosis: data.left.posterior.diagnosis,
        prDiagnosis: data.right.posterior.diagnosis,
        plPlan: data.left.posterior.plan,
        prPlan: data.right.posterior.plan,
        plSurgicalDiagnosisCataracs: data.left.posterior.surgicalDiagnosisCataracs,
        prSurgicalDiagnosisCataracs: data.right.posterior.surgicalDiagnosisCataracs,
        plSurgicalDiagnosisPterygium: data.left.posterior.surgicalDiagnosisPterygium,
        prSurgicalDiagnosisPterygium: data.right.posterior.surgicalDiagnosisPterygium,
        plSurgicalDiagnosisInjurySuturing: data.left.posterior.surgicalDiagnosisInjurySuturing,
        prSurgicalDiagnosisInjurySuturing: data.right.posterior.surgicalDiagnosisInjurySuturing,
        plSurgicalDiagnosisCornealTransplant: data
          .left.posterior.surgicalDiagnosisCornealTransplant,
        prSurgicalDiagnosisCornealTransplant: data
          .right.posterior.surgicalDiagnosisCornealTransplant,
        plSurgicalDiagnosisRetina: data.left.posterior.surgicalDiagnosisRetina,
        prSurgicalDiagnosisRetina: data.right.posterior.surgicalDiagnosisRetina,
        plSurgicalDiagnosisRefractive: data.left.posterior.surgicalDiagnosisRefractive,
        prSurgicalDiagnosisRefractive: data.right.posterior.surgicalDiagnosisRefractive,
        plSurgicalDiagnosisStrabismus: data.left.posterior.surgicalDiagnosisStrabismus,
        prSurgicalDiagnosisStrabismus: data.right.posterior.surgicalDiagnosisStrabismus,
        plSurgicalDiagnosisGlaucoma: data.left.posterior.surgicalDiagnosisGlaucoma,
        prSurgicalDiagnosisGlaucoma: data.right.posterior.surgicalDiagnosisGlaucoma,
        plSurgicalDiagnosisOther: data.left.posterior.surgicalDiagnosisOther,
        prSurgicalDiagnosisOther: data.right.posterior.surgicalDiagnosisOther,
        plSurgicalPlan: data.left.posterior.surgicalPlan,
        prSurgicalPlan: data.right.posterior.surgicalPlan,
        arEyelid: data.right.anterior.eyelid,
        alEyelid: data.left.anterior.eyelid,
        arEyelidComments: data.right.anterior.eyelidComments,
        alEyelidComments: data.left.anterior.eyelidComments,
        arAnnexes: data.right.anterior.annexes,
        alAnnexes: data.left.anterior.annexes,
        arAnnexesComments: data.right.anterior.annexesComments,
        alAnnexesComments: data.left.anterior.annexesComments,
        arOcularGlobule: data.right.anterior.ocularGlobule,
        alOcularGlobule: data.left.anterior.ocularGlobule,
        arOcularGlobuleComments: data.right.anterior.ocularGlobuleComments,
        alOcularGlobuleComments: data.left.anterior.ocularGlobuleComments,
        arOcularMotility: data.right.anterior.ocularMotility,
        alOcularMotility: data.left.anterior.ocularMotility,
        arOcularMotilityComments: data.right.anterior.ocularMotilityComments,
        alOcularMotilityComments: data.left.anterior.ocularMotilityComments,
        arConjunctiva: data.right.anterior.conjunctiva,
        alConjunctiva: data.left.anterior.conjunctiva,
        arConjunctivaComments: data.right.anterior.conjunctivaComments,
        alConjunctivaComments: data.left.anterior.conjunctivaComments,
        arSclera: data.right.anterior.sclera,
        alSclera: data.left.anterior.sclera,
        arScleraComments: data.right.anterior.scleraComments,
        alScleraComments: data.left.anterior.scleraComments,
        arCornea: data.right.anterior.cornea,
        alCornea: data.left.anterior.cornea,
        arCorneaComments: data.right.anterior.corneaComments,
        alCorneaComments: data.left.anterior.corneaComments,
        arAnteriorChamber: data.right.anterior.anteriorChamber,
        alAnteriorChamber: data.left.anterior.anteriorChamber,
        arAnteriorChamberComments: data.right.anterior.anteriorChamberComments,
        alAnteriorChamberComments: data.left.anterior.anteriorChamberComments,
        arIris: data.right.anterior.iris,
        alIris: data.left.anterior.iris,
        arIrisComments: data.right.anterior.irisComments,
        alIrisComments: data.left.anterior.irisComments,
        arGinioscopy: data.right.anterior.ginioscopy,
        alGinioscopy: data.left.anterior.ginioscopy,
        arGinioscopyComments: data.right.anterior.ginioscopyComments,
        alGinioscopyComments: data.left.anterior.ginioscopyComments,
        arLens: data.right.anterior.lens,
        alLens: data.left.anterior.lens,
        arLensComments: data.right.anterior.lensComments,
        alLensComments: data.left.anterior.lensComments,
        arOther: data.right.anterior.other,
        alOther: data.left.anterior.other,
      };
    },
    fullGetFormat(data = {}) {
      const { anteriorSegment, posteriorSegment } = data;
      const [pl] = posteriorSegment.filter((x) => x.eyeSide === 'LEFT');
      const [al] = anteriorSegment.filter((x) => x.eyeSide === 'LEFT');
      const [pr] = posteriorSegment.filter((x) => x.eyeSide === 'RIGHT');
      const [ar] = anteriorSegment.filter((x) => x.eyeSide === 'RIGHT');
      return {
        reason: data.reason,
        left: {
          anterior: {
            ...al,
          },
          posterior: {
            ...pl,
            statisticalDiagnosisHealthy: !!pl.statisticalDiagnosisHealthy,
            statisticalDiagnosisSquint: !!pl.statisticalDiagnosisSquint,
            statisticalDiagnosisCataracts: !!pl.statisticalDiagnosisCataracts,
            statisticalDiagnosisGlaucoma: !!pl.statisticalDiagnosisGlaucoma,
            statisticalDiagnosisDiabeticRetinopathy: !!pl.statisticalDiagnosisDiabeticRetinopathy,
            statisticalDiagnosisCornealTransplant: !!pl.statisticalDiagnosisCornealTransplant,
            statisticalDiagnosisPostOperated: !!pl.statisticalDiagnosisPostOperated,
            statisticalDiagnosisOther: !!pl.statisticalDiagnosisOther,
            surgicalDiagnosisCataracs: !!pl.surgicalDiagnosisCataracs,
            surgicalDiagnosisPterygium: !!pl.surgicalDiagnosisPterygium,
            surgicalDiagnosisInjurySuturing: !!pl.surgicalDiagnosisInjurySuturing,
            surgicalDiagnosisCornealTransplant: !!pl.surgicalDiagnosisCornealTransplant,
            surgicalDiagnosisRetina: !!pl.surgicalDiagnosisRetina,
            surgicalDiagnosisRefractive: !!pl.surgicalDiagnosisRefractive,
            surgicalDiagnosisStrabismus: !!pl.surgicalDiagnosisStrabismus,
            surgicalDiagnosisGlaucoma: !!pl.surgicalDiagnosisGlaucoma,
            surgicalDiagnosisOther: !!pl.surgicalDiagnosisOther,
            surgicalPlan: pl.surgicalPlan,
          },
        },
        right: {
          anterior: {
            ...ar,
          },
          posterior: {
            ...pr,
            statisticalDiagnosisHealthy: !!pr.statisticalDiagnosisHealthy,
            statisticalDiagnosisSquint: !!pr.statisticalDiagnosisSquint,
            statisticalDiagnosisCataracts: !!pr.statisticalDiagnosisCataracts,
            statisticalDiagnosisGlaucoma: !!pr.statisticalDiagnosisGlaucoma,
            statisticalDiagnosisDiabeticRetinopathy: !!pr.statisticalDiagnosisDiabeticRetinopathy,
            statisticalDiagnosisCornealTransplant: !!pr.statisticalDiagnosisCornealTransplant,
            statisticalDiagnosisPostOperated: !!pr.statisticalDiagnosisPostOperated,
            statisticalDiagnosisOther: !!pr.statisticalDiagnosisOther,
            surgicalDiagnosisCataracs: !!pr.surgicalDiagnosisCataracs,
            surgicalDiagnosisPterygium: !!pr.surgicalDiagnosisPterygium,
            surgicalDiagnosisInjurySuturing: !!pr.surgicalDiagnosisInjurySuturing,
            surgicalDiagnosisCornealTransplant: !!pr.surgicalDiagnosisCornealTransplant,
            surgicalDiagnosisRetina: !!pr.surgicalDiagnosisRetina,
            surgicalDiagnosisRefractive: !!pr.surgicalDiagnosisRefractive,
            surgicalDiagnosisStrabismus: !!pr.surgicalDiagnosisStrabismus,
            surgicalDiagnosisGlaucoma: !!pr.surgicalDiagnosisGlaucoma,
            surgicalDiagnosisOther: !!pr.surgicalDiagnosisOther,
            surgicalPlan: pr.surgicalPlan,
          },
        },
      };
    },
    postASFormat(data = {}) {
      return {
        rEyelid: data.right.anterior.eyelid,
        lEyelid: data.left.anterior.eyelid,
        rEyelidComments: data.right.anterior.eyelidComments,
        lEyelidComments: data.left.anterior.eyelidComments,
        rAnnexes: data.right.anterior.annexes,
        lAnnexes: data.left.anterior.annexes,
        rAnnexesComments: data.right.anterior.annexesComments,
        lAnnexesComments: data.left.anterior.annexesComments,
        rOcularGlobule: data.right.anterior.ocularGlobule,
        lOcularGlobule: data.left.anterior.ocularGlobule,
        rOcularGlobuleComments: data.right.anterior.ocularGlobuleComments,
        lOcularGlobuleComments: data.left.anterior.ocularGlobuleComments,
        rOcularMotility: data.right.anterior.ocularMotility,
        lOcularMotility: data.left.anterior.ocularMotility,
        rOcularMotilityComments: data.right.anterior.ocularMotilityComments,
        lOcularMotilityComments: data.left.anterior.ocularMotilityComments,
        rConjunctiva: data.right.anterior.conjunctiva,
        lConjunctiva: data.left.anterior.conjunctiva,
        rConjunctivaComments: data.right.anterior.conjunctivaComments,
        lConjunctivaComments: data.left.anterior.conjunctivaComments,
        rSclera: data.right.anterior.sclera,
        lSclera: data.left.anterior.sclera,
        rScleraComments: data.right.anterior.scleraComments,
        lScleraComments: data.left.anterior.scleraComments,
        rCornea: data.right.anterior.cornea,
        lCornea: data.left.anterior.cornea,
        rCorneaComments: data.right.anterior.corneaComments,
        lCorneaComments: data.left.anterior.corneaComments,
        rAnteriorChamber: data.right.anterior.anteriorChamber,
        lAnteriorChamber: data.left.anterior.anteriorChamber,
        rAnteriorChamberComments: data.right.anterior.anteriorChamberComments,
        lAnteriorChamberComments: data.left.anterior.anteriorChamberComments,
        rIris: data.right.anterior.iris,
        lIris: data.left.anterior.iris,
        rIrisComments: data.right.anterior.irisComments,
        lIrisComments: data.left.anterior.irisComments,
        rGinioscopy: data.right.anterior.ginioscopy,
        lGinioscopy: data.left.anterior.ginioscopy,
        rGinioscopyComments: data.right.anterior.ginioscopyComments,
        lGinioscopyComments: data.left.anterior.ginioscopyComments,
        rLens: data.right.anterior.lens,
        lLens: data.left.anterior.lens,
        rLensComments: data.right.anterior.lensComments,
        lLensComments: data.left.anterior.lensComments,
        rOther: data.right.anterior.other,
        lOther: data.left.anterior.other,
      };
    },
    postPSFormat(data = {}) {
      return {
        rRetina: data.right.posterior.retina,
        lRetina: data.left.posterior.retina,
        rRetinaComments: data.right.posterior.retinaComments,
        lRetinaComments: data.left.posterior.retinaComments,
        rVitreo: data.right.posterior.vitreo,
        lVitreo: data.left.posterior.vitreo,
        rVitreoComments: data.right.posterior.vitreoComments,
        lVitreoComments: data.left.posterior.vitreoComments,
        rCupDisc: data.right.posterior.cupDisc,
        lCupDisc: data.left.posterior.cupDisc,
        rCupDiscComments: data.right.posterior.cupDiscComments,
        lCupDiscComments: data.left.posterior.cupDiscComments,
        rNerve: data.right.posterior.nerve,
        rNerveComments: data.right.posterior.nerveComments,
        lNerve: data.left.posterior.nerve,
        lNerveComments: data.left.posterior.nerveComments,
        rMacula: data.right.posterior.macula,
        lMacula: data.left.posterior.macula,
        rMaculaComments: data.right.posterior.maculaComments,
        lMaculaComments: data.left.posterior.maculaComments,
        rVessel: data.right.posterior.vessel,
        lVessel: data.left.posterior.vessel,
        rVesselComments: data.right.posterior.vesselComments,
        lVesselComments: data.left.posterior.vesselComments,
        rPeriphery: data.right.posterior.periphery,
        lPeriphery: data.left.posterior.periphery,
        rPeripheryComments: data.right.posterior.peripheryComments,
        lPeripheryComments: data.left.posterior.peripheryComments,
        rStatisticalDiagnosisHealthy: data.left.posterior.statisticalDiagnosisHealthy,
        lStatisticalDiagnosisHealthy: data.right.posterior.statisticalDiagnosisHealthy,
        rStatisticalDiagnosisSquint: data.left.posterior.statisticalDiagnosisSquint,
        lStatisticalDiagnosisSquint: data.right.posterior.statisticalDiagnosisSquint,
        rStatisticalDiagnosisCataracts: data.left.posterior.statisticalDiagnosisCataracts,
        lStatisticalDiagnosisCataracts: data.right.posterior.statisticalDiagnosisCataracts,
        rStatisticalDiagnosisGlaucoma: data.left.posterior.statisticalDiagnosisGlaucoma,
        lStatisticalDiagnosisGlaucoma: data.right.posterior.statisticalDiagnosisGlaucoma,
        rStatisticalDiagnosisDiabeticRetinopathy: data.left
          .posterior.statisticalDiagnosisDiabeticRetinopathy,
        lStatisticalDiagnosisDiabeticRetinopathy: data.right
          .posterior.statisticalDiagnosisDiabeticRetinopathy,
        lStatisticalDiagnosisCornealTransplant: data.left
          .posterior.statisticalDiagnosisCornealTransplant,
        rStatisticalDiagnosisCornealTransplant: data.left
          .posterior.statisticalDiagnosisCornealTransplant,
        lStatisticalDiagnosisPostOperated: data.left.posterior.statisticalDiagnosisPostOperated,
        rStatisticalDiagnosisPostOperated: data.left.posterior.statisticalDiagnosisPostOperated,
        rStatisticalDiagnosisOther: data.left.posterior.statisticalDiagnosisOther,
        lStatisticalDiagnosisOther: data.right.posterior.statisticalDiagnosisOther,
        rDiagnosis: data.right.posterior.diagnosis,
        lDiagnosis: data.left.posterior.diagnosis,
        rPlan: data.right.posterior.plan,
        lPlan: data.left.posterior.plan,
        rSurgicalDiagnosisCataracs: data.right.posterior.surgicalDiagnosisCataracs,
        lSurgicalDiagnosisCataracs: data.left.posterior.surgicalDiagnosisCataracs,
        rSurgicalDiagnosisPterygium: data.right.posterior.surgicalDiagnosisPterygium,
        lSurgicalDiagnosisPterygium: data.left.posterior.surgicalDiagnosisPterygium,
        rSurgicalDiagnosisInjurySuturing: data.right.posterior.surgicalDiagnosisInjurySuturing,
        lSurgicalDiagnosisInjurySuturing: data.left.posterior.surgicalDiagnosisInjurySuturing,
        rSurgicalDiagnosisCornealTransplant: data
          .right.posterior.surgicalDiagnosisCornealTransplant,
        lSurgicalDiagnosisCornealTransplant: data.left.posterior.surgicalDiagnosisCornealTransplant,
        rSurgicalDiagnosisRetina: data.right.posterior.surgicalDiagnosisRetina,
        lSurgicalDiagnosisRetina: data.left.posterior.surgicalDiagnosisRetina,
        rSurgicalDiagnosisRefractive: data.right.posterior.surgicalDiagnosisRefractive,
        lSurgicalDiagnosisRefractive: data.left.posterior.surgicalDiagnosisRefractive,
        rSurgicalDiagnosisStrabismus: data.right.posterior.surgicalDiagnosisStrabismus,
        lSurgicalDiagnosisStrabismus: data.left.posterior.surgicalDiagnosisStrabismus,
        rSurgicalDiagnosisGlaucoma: data.right.posterior.surgicalDiagnosisGlaucoma,
        lSurgicalDiagnosisGlaucoma: data.left.posterior.surgicalDiagnosisGlaucoma,
        rSurgicalDiagnosisOther: data.right.posterior.surgicalDiagnosisOther,
        lSurgicalDiagnosisOther: data.left.posterior.surgicalDiagnosisOther,
        rSurgicalPlan: data.right.posterior.surgicalPlan,
        lSurgicalPlan: data.left.posterior.surgicalPlan,
      };
    },
  },
};
