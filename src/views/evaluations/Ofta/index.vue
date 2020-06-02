<template>
  <el-row
    class="row"
    id="ophthalmologicEvaluation"
    style="height:100%"
  >
    <el-col class="col" style="height:100%;width:95%">
      <Title2
        :btnText="btnText"
        :title="'EVALUACIÓN OFTALMOLÓGICA'"
        :label="label"
        v-on:beforeSubmit="beforeSubmit"
        :disabled="loading"
      />
      <div class="form">
        <el-container>
          <el-main>
            <el-form
              :model="form"
              ref="refId"
              :rules="rules"
              @submit.prevent
              :disabled="loading"
            >
              <div>
                <p
                  style="
                    color: #006EFF;
                    font-weight: bold;
                    font-size: 15px !important;
                    margin: 0px;
                  "
                >
                  VALORACIÓN MÉDICA
                </p>
                <el-form-item
                  prop="reason"
                  class="large"
                  label="Motivo de consulta / Padecimiento actual"
                >
                  <el-input
                    v-model="form.reason"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 2}"
                  />
                </el-form-item>
              </div>

              <!-- EVA -->
              <p class="title">
                SEGMENTO ANTERIOR
              </p>
              <div class="horizontal-align-form">
                <div>
                  <p class="subtitle">Ojo Izquierdo</p>
                  <el-form-item prop="left.anterior.eyelid" label="Parpados">
                    <el-select class="medium" v-model="form.left.anterior.eyelid">
                      <el-option
                        v-for="item in options.eyelids"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="left.anterior.eyelidComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.left.anterior.eyelidComments" />
                  </el-form-item>

                  <el-form-item prop="left.anterior.annexes" class="medium" label="Anexos">
                    <el-select v-model="form.left.anterior.annexes">
                      <el-option
                        v-for="item in options.annexes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="left.anterior.annexesComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.left.anterior.annexesComments" />
                  </el-form-item>

                  <el-form-item
                    prop="left.anterior.ocularGlobule"
                    class="medium"
                    label="Globulo Ocular"
                  >
                    <el-select v-model="form.left.anterior.ocularGlobule">
                      <el-option
                        v-for="item in options.ocularGlobule"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="left.anterior.ocularGlobuleComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.left.anterior.ocularGlobuleComments" />
                  </el-form-item>

                  <el-form-item
                    prop="left.anterior.ocularMotility"
                    class="medium"
                    label="Motilidad Ocular"
                  >
                    <el-select v-model="form.left.anterior.ocularMotility">
                      <el-option
                        v-for="item in options.ocularMotility"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="left.anterior.ocularMotilityComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.left.anterior.ocularMotilityComments" />
                  </el-form-item>

                  <el-form-item
                    prop="left.anterior.conjunctiva"
                    class="medium"
                    label="Conjuntiva"
                  >
                    <el-select v-model="form.left.anterior.conjunctiva">
                      <el-option
                        v-for="item in options.conjunctiva"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="left.anterior.conjunctivaComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.left.anterior.conjunctivaComments" />
                  </el-form-item>

                  <el-form-item prop="left.anterior.sclera" class="medium" label="Esclera">
                    <el-select v-model="form.left.anterior.sclera">
                      <el-option-group
                        v-for="group in options.sclera"
                        :key="group.key"
                        :label="group.label"
                      >
                        <el-option
                          v-for="item in group.ops"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-option-group>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="left.anterior.scleraComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.left.anterior.scleraComments" />
                  </el-form-item>

                  <el-form-item prop="left.anterior.cornea" class="medium" label="Córnea">
                    <el-select v-model="form.left.anterior.cornea">
                      <el-option-group
                        v-for="group in options.cornea"
                        :key="group.key"
                        :label="group.label"
                      >
                        <el-option
                          v-for="item in group.ops"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-option-group>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="left.anterior.corneaComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.left.anterior.corneaComments" />
                  </el-form-item>

                  <el-form-item
                    prop="left.anterior.anteriorChamber"
                    class="medium"
                    label="Cámara anterior"
                  >
                    <el-select v-model="form.left.anterior.anteriorChamber">
                      <el-option-group
                        v-for="group in options.anteriorChamber"
                        :key="group.key"
                        :label="group.label"
                      >
                        <el-option
                          v-for="item in group.ops"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-option-group>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="left.anterior.anteriorChamberComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.left.anterior.anteriorChamberComments" />
                  </el-form-item>

                  <el-form-item prop="left.anterior.iris" class="medium" label="Iris">
                    <el-select v-model="form.left.anterior.iris">
                      <el-option
                        v-for="item in options.iris"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="left.anterior.irisComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.left.anterior.irisComments" />
                  </el-form-item>

                  <el-form-item
                    prop="left.anterior.ginioscopy"
                    class="medium"
                    label="Gonioscopía"
                  >
                    <el-select v-model="form.left.anterior.ginioscopy">
                      <el-option
                        v-for="item in options.ginioscopy"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="left.anterior.ginioscopyComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.left.anterior.ginioscopyComments" />
                  </el-form-item>

                  <el-form-item prop="left.anterior.lens" class="medium" label="Cristalino">
                    <el-select v-model="form.left.anterior.lens">
                      <el-option-group
                        v-for="group in options.lens"
                        :key="group.key"
                        :label="group.label"
                      >
                        <el-option
                          v-for="item in group.ops"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-option-group>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="left.anterior.lensComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.left.anterior.lensComments" />
                  </el-form-item>

                  <el-form-item
                    prop="left.anterior.other"
                    class="xlarge"
                    label="Otros Padecimientos"
                  >
                    <el-input
                      v-model="form.left.anterior.other"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 2}"
                    />
                  </el-form-item>
                </div>
                <div>
                  <p class="subtitle">Ojo Derecho</p>
                  <el-form-item prop="right.anterior.eyelid" label="Parpados">
                    <el-select class="medium" v-model="form.right.anterior.eyelid">
                      <el-option
                        v-for="item in options.eyelids"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="right.anterior.eyelidComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.right.anterior.eyelidComments" />
                  </el-form-item>

                  <el-form-item prop="right.anterior.annexes" class="medium" label="Anexos">
                    <el-select v-model="form.right.anterior.annexes">
                      <el-option
                        v-for="item in options.annexes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="right.anterior.annexesComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.right.anterior.annexesComments" />
                  </el-form-item>

                  <el-form-item
                    prop="right.anterior.ocularGlobule"
                    class="medium"
                    label="Globulo Ocular"
                  >
                    <el-select v-model="form.right.anterior.ocularGlobule">
                      <el-option
                        v-for="item in options.ocularGlobule"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="right.anterior.ocularGlobuleComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.right.anterior.ocularGlobuleComments" />
                  </el-form-item>

                  <el-form-item
                    prop="right.anterior.ocularMotility"
                    class="medium"
                    label="Motilidad Ocular"
                  >
                    <el-select v-model="form.right.anterior.ocularMotility">
                      <el-option
                        v-for="item in options.ocularMotility"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="right.anterior.ocularMotilityComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.right.anterior.ocularMotilityComments" />
                  </el-form-item>

                  <el-form-item
                    prop="right.anterior.conjunctiva"
                    class="medium"
                    label="Conjuntiva"
                  >
                    <el-select v-model="form.right.anterior.conjunctiva">
                      <el-option
                        v-for="item in options.conjunctiva"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="right.anterior.conjunctivaComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.right.anterior.conjunctivaComments" />
                  </el-form-item>

                  <el-form-item prop="right.anterior.sclera" class="medium" label="Esclera">
                    <el-select v-model="form.right.anterior.sclera">
                      <el-option-group
                        v-for="group in options.sclera"
                        :key="group.key"
                        :label="group.label"
                      >
                        <el-option
                          v-for="item in group.ops"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-option-group>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="right.anterior.scleraComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.right.anterior.scleraComments" />
                  </el-form-item>

                  <el-form-item prop="right.anterior.cornea" class="medium" label="Córnea">
                    <el-select v-model="form.right.anterior.cornea">
                      <el-option-group
                        v-for="group in options.cornea"
                        :key="group.key"
                        :label="group.label"
                      >
                        <el-option
                          v-for="item in group.ops"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-option-group>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="right.anterior.corneaComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.right.anterior.corneaComments" />
                  </el-form-item>

                  <el-form-item
                    prop="right.anterior.anteriorChamber"
                    class="medium"
                    label="Cámara anterior"
                  >
                    <el-select v-model="form.right.anterior.anteriorChamber">
                      <el-option-group
                        v-for="group in options.anteriorChamber"
                        :key="group.key"
                        :label="group.label"
                      >
                        <el-option
                          v-for="item in group.ops"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-option-group>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="right.anterior.anteriorChamberComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.right.anterior.anteriorChamberComments" />
                  </el-form-item>

                  <el-form-item prop="right.anterior.iris" class="medium" label="Iris">
                    <el-select v-model="form.right.anterior.iris">
                      <el-option
                        v-for="item in options.iris"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="right.anterior.irisComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.right.anterior.irisComments" />
                  </el-form-item>

                  <el-form-item
                    prop="right.anterior.ginioscopy"
                    class="medium"
                    label="Gonioscopía"
                  >
                    <el-select v-model="form.right.anterior.ginioscopy">
                      <el-option
                        v-for="item in options.ginioscopy"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="right.anterior.ginioscopyComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.right.anterior.ginioscopyComments" />
                  </el-form-item>

                  <el-form-item prop="right.anterior.lens" class="medium" label="Cristalino">
                    <el-select v-model="form.right.anterior.lens">
                      <el-option-group
                        v-for="group in options.lens"
                        :key="group.key"
                        :label="group.label"
                      >
                        <el-option
                          v-for="item in group.ops"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-option-group>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="right.anterior.lensComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.right.anterior.lensComments" />
                  </el-form-item>

                  <el-form-item
                    prop="right.anterior.other"
                    class="xlarge"
                    label="Otros Padecimientos"
                  >
                    <el-input
                      v-model="form.right.anterior.other"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 2}"
                    />
                  </el-form-item>
                </div>
              </div>

              <p class="title">
                SEGMENTO POSTERIOR
              </p>
              <div class="horizontal-align-form">
                <div>
                  <p class="subtitle">Ojo Izquierdo</p>
                  <el-form-item
                    prop="left.posterior.retina"
                    class="medium"
                    label="Retina general"
                  >
                    <el-select v-model="form.left.posterior.retina">
                      <el-option
                        v-for="item in options.retina"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="left.posterior.retinaComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.left.posterior.retinaComments" />
                  </el-form-item>
                  <el-form-item prop="left.posterior.vitreo" class="medium" label="Vitreo">
                    <el-select v-model="form.left.posterior.vitreo">
                      <el-option-group
                        v-for="group in options.vitreo"
                        :key="group.key"
                        :label="group.label"
                      >
                        <el-option
                          v-for="item in group.ops"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-option-group>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="left.posterior.vitreoComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.left.posterior.vitreoComments" />
                  </el-form-item>
                  <el-form-item
                    prop="left.posterior.cupDisc"
                    class="medium"
                    label="Relación Copa/Disco"
                  >
                    <el-input v-model="form.left.posterior.cupDisc" />
                  </el-form-item>
                  <el-form-item
                    prop="left.posterior.cupDiscComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.left.posterior.cupDiscComments" />
                  </el-form-item>
                  <el-form-item prop="left.posterior.nerve" class="medium" label="Nervio">
                    <el-select v-model="form.left.posterior.nerve">
                      <el-option
                        v-for="item in options.nerve"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="left.posterior.nerveComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.left.posterior.nerveComments" />
                  </el-form-item>
                  <el-form-item prop="left.posterior.macula" class="medium" label="Mácula">
                    <el-select v-model="form.left.posterior.macula">
                      <el-option
                        v-for="item in options.macula"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="left.posterior.maculaComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.left.posterior.maculaComments" />
                  </el-form-item>
                  <el-form-item prop="left.posterior.vessel" class="medium" label="Vasos">
                    <el-select v-model="form.left.posterior.vessel">
                      <el-option-group
                        v-for="group in options.vessel"
                        :key="group.key"
                        :label="group.label"
                      >
                        <el-option
                          v-for="item in group.ops"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-option-group>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="left.posterior.vesselComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.left.posterior.vesselComments" />
                  </el-form-item>
                  <el-form-item prop="left.posterior.periphery" class="medium" label="Periferia">
                    <el-select v-model="form.left.posterior.periphery">
                      <el-option
                        v-for="item in options.periphery"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="left.posterior.peripheryComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.left.posterior.peripheryComments" />
                  </el-form-item>
                  <p class="subtitle">Diagnóstico Estadístico</p>
                  <el-checkbox
                    v-model="form.left.posterior.statisticalDiagnosisHealthy"
                  >
                    Sano
                  </el-checkbox>
                  <el-checkbox
                    v-model="form.left.posterior.statisticalDiagnosisSquint"
                  >
                    Estrabismo
                  </el-checkbox>
                  <el-checkbox
                    v-model="form.left.posterior.statisticalDiagnosisCataracts"
                  >
                    Cataratas
                  </el-checkbox>
                  <el-checkbox
                    v-model="form.left.posterior.statisticalDiagnosisGlaucoma"
                  >
                    Glaucoma
                  </el-checkbox>
                  <el-checkbox
                    v-model="form.left.posterior.statisticalDiagnosisDiabeticRetinopathy"
                  >
                    Retinopatía Diabética
                  </el-checkbox>
                  <el-checkbox
                    v-model="form.left.posterior.statisticalDiagnosisCornealTransplant"
                  >
                    Transplante de Córnea
                  </el-checkbox>
                  <el-checkbox
                    v-model="form.left.posterior.statisticalDiagnosisPostOperated"
                  >
                    Post-Operado
                  </el-checkbox>
                  <el-checkbox
                    v-model="form.left.posterior.statisticalDiagnosisOther"
                  >
                    Otros
                  </el-checkbox>
                  <el-form-item
                    prop="left.posterior.diagnosis"
                    class="midlarge"
                    label="Diagnósticos"
                  >
                    <el-input
                      v-model="form.left.posterior.diagnosis"
                      type="textarea"
                      :autosize="{ minRows: 3, maxRows: 3}"
                    />
                  </el-form-item>
                  <el-form-item prop="left.posterior.plan" class="midlarge" label="Plan">
                    <el-input
                      v-model="form.left.posterior.plan"
                      type="textarea"
                      :autosize="{ minRows: 3, maxRows: 3}"
                    />
                  </el-form-item>
                  <p class="subtitle">Diagnóstico Quirúrgico</p>
                  <el-checkbox
                    v-model="form.left.posterior.surgicalDiagnosisCataracs"
                  >
                    Cx Catarata
                  </el-checkbox>
                  <el-checkbox
                    v-model="form.left.posterior.surgicalDiagnosisPterygium"
                  >
                    Cx Pterigion
                  </el-checkbox>
                  <el-checkbox
                    v-model="form.left.posterior.surgicalDiagnosisInjurySuturing"
                  >
                    Cierre Herida
                  </el-checkbox>
                  <el-checkbox
                    v-model="form.left.posterior.surgicalDiagnosisCornealTransplant"
                  >
                    Trasplante de córnea
                  </el-checkbox>
                  <el-checkbox
                    v-model="form.left.posterior.surgicalDiagnosisRetina"
                  >
                    Cx Retina
                  </el-checkbox>
                  <el-checkbox
                    v-model="form.left.posterior.surgicalDiagnosisRefractive"
                  >
                    Cx Refractiva
                  </el-checkbox>
                  <el-checkbox
                    v-model="form.left.posterior.surgicalDiagnosisStrabismus"
                  >
                    Cx Estrabismo
                  </el-checkbox>
                  <el-checkbox
                    v-model="form.left.posterior.surgicalDiagnosisGlaucoma"
                  >
                    Cx Glaucoma
                  </el-checkbox>
                  <el-checkbox
                    v-model="form.left.posterior.surgicalDiagnosisOther"
                  >
                    Otra cirugía
                  </el-checkbox>
                  <el-form-item
                    prop="left.posterior.surgicalPlan"
                    class="midlarge"
                    label="Plan Quirúrjico"
                  >
                    <el-input
                      v-model="form.left.posterior.surgicalPlan"
                      type="textarea"
                      :autosize="{ minRows: 3, maxRows: 3}"
                    />
                  </el-form-item>
                </div>
                <div>
                  <p class="subtitle">Ojo Derecho</p>
                  <el-form-item
                    prop="right.posterior.retina"
                    class="medium"
                    label="Retina general"
                  >
                    <el-select v-model="form.right.posterior.retina">
                      <el-option
                        v-for="item in options.retina"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="right.posterior.retinaComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.right.posterior.retinaComments" />
                  </el-form-item>
                  <el-form-item prop="right.posterior.vitreo" class="medium" label="Vitreo">
                    <el-select v-model="form.right.posterior.vitreo">
                      <el-option-group
                        v-for="group in options.vitreo"
                        :key="group.key"
                        :label="group.label"
                      >
                        <el-option
                          v-for="item in group.ops"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-option-group>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="right.posterior.vitreoComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.right.posterior.vitreoComments" />
                  </el-form-item>
                  <el-form-item
                    prop="right.posterior.cupDisc"
                    class="medium"
                    label="Relación Copa/Disco"
                  >
                    <el-input v-model="form.right.posterior.cupDisc" />
                  </el-form-item>
                  <el-form-item
                    prop="right.posterior.cupDiscComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.right.posterior.cupDiscComments" />
                  </el-form-item>
                  <el-form-item prop="right.posterior.nerve" class="medium" label="Nervio">
                    <el-select v-model="form.right.posterior.nerve">
                      <el-option
                        v-for="item in options.nerve"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="right.posterior.nerveComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.right.posterior.nerveComments" />
                  </el-form-item>
                  <el-form-item prop="right.posterior.macula" class="medium" label="Mácula">
                    <el-select v-model="form.right.posterior.macula">
                      <el-option
                        v-for="item in options.macula"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="right.posterior.maculaComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.right.posterior.maculaComments" />
                  </el-form-item>
                  <el-form-item prop="right.posterior.vessel" class="medium" label="Vasos">
                    <el-select v-model="form.right.posterior.vessel">
                      <el-option-group
                        v-for="group in options.vessel"
                        :key="group.key"
                        :label="group.label"
                      >
                        <el-option
                          v-for="item in group.ops"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-option-group>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="right.posterior.vesselComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.right.posterior.vesselComments" />
                  </el-form-item>
                  <el-form-item prop="right.posterior.periphery" class="medium" label="Periferia">
                    <el-select v-model="form.right.posterior.periphery">
                      <el-option
                        v-for="item in options.periphery"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="right.posterior.peripheryComments"
                    class="large"
                    label="Comentarios"
                  >
                    <el-input v-model="form.right.posterior.peripheryComments" />
                  </el-form-item>
                  <p class="subtitle">Diagnóstico Estadístico</p>
                  <el-checkbox
                    v-model="form.right.posterior.statisticalDiagnosisHealthy"
                  >
                    Sano
                  </el-checkbox>
                  <el-checkbox
                    v-model="form.right.posterior.statisticalDiagnosisSquint"
                  >
                    Estrabismo
                  </el-checkbox>
                  <el-checkbox
                    v-model="form.right.posterior.statisticalDiagnosisCataracts"
                  >
                    Cataratas
                  </el-checkbox>
                  <el-checkbox
                    v-model="form.right.posterior.statisticalDiagnosisGlaucoma"
                  >
                    Glaucoma
                  </el-checkbox>
                  <el-checkbox
                    v-model="form.right.posterior.statisticalDiagnosisDiabeticRetinopathy"
                  >
                    Retinopatía Diabética
                  </el-checkbox>
                  <el-checkbox
                    v-model="form.right.posterior.statisticalDiagnosisCornealTransplant"
                  >
                    Transplante de Córnea
                  </el-checkbox>
                  <el-checkbox
                    v-model="form.right.posterior.statisticalDiagnosisPostOperated"
                  >
                    Post-Operado
                  </el-checkbox>
                  <el-checkbox
                    v-model="form.right.posterior.statisticalDiagnosisOther"
                  >
                    Otros
                  </el-checkbox>
                  <el-form-item
                    prop="right.posterior.diagnosis"
                    class="midlarge"
                    label="Diagnósticos"
                  >
                    <el-input
                      v-model="form.right.posterior.diagnosis"
                      type="textarea"
                      :autosize="{ minRows: 3, maxRows: 3}"
                    />
                  </el-form-item>
                  <el-form-item prop="right.posterior.plan" class="midlarge" label="Plan">
                    <el-input
                      v-model="form.right.posterior.plan"
                      type="textarea"
                      :autosize="{ minRows: 3, maxRows: 3}"
                    />
                  </el-form-item>
                  <p class="subtitle">Diagnóstico Quirúrgico</p>
                  <el-checkbox
                    v-model="form.right.posterior.surgicalDiagnosisCataracs"
                  >
                    Cx Catarata
                  </el-checkbox>
                  <el-checkbox
                    v-model="form.right.posterior.surgicalDiagnosisPterygium"
                  >
                    Cx Pterigion
                  </el-checkbox>
                  <el-checkbox
                    v-model="form.right.posterior.surgicalDiagnosisInjurySuturing"
                  >
                    Cierre Herida
                  </el-checkbox>
                  <el-checkbox
                    v-model="form.right.posterior.surgicalDiagnosisCornealTransplant"
                  >
                    Trasplante de córnea
                  </el-checkbox>
                  <el-checkbox
                    v-model="form.right.posterior.surgicalDiagnosisRetina"
                  >
                    Cx Retina
                  </el-checkbox>
                  <el-checkbox
                    v-model="form.right.posterior.surgicalDiagnosisRefractive"
                  >
                    Cx Refractiva
                  </el-checkbox>
                  <el-checkbox
                    v-model="form.right.posterior.surgicalDiagnosisStrabismus"
                  >
                    Cx Estrabismo
                  </el-checkbox>
                  <el-checkbox
                    v-model="form.right.posterior.surgicalDiagnosisGlaucoma"
                  >
                    Cx Glaucoma
                  </el-checkbox>
                  <el-checkbox
                    v-model="form.right.posterior.surgicalDiagnosisOther"
                  >
                    Otra cirugía
                  </el-checkbox>
                  <el-form-item
                    prop="right.posterior.surgicalPlan"
                    class="midlarge"
                    label="Plan Quirúrjico"
                  >
                    <el-input
                      v-model="form.right.posterior.surgicalPlan"
                      type="textarea"
                      :autosize="{ minRows: 3, maxRows: 3}"
                    />
                  </el-form-item>
                </div>
              </div>

              <el-form-item style="width: 120px;" label="¿Desea agendar próxima cita?">
                <el-select v-model="date">
                  <el-option
                    v-for="item in options.tf"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <!-- EVA -->

              <el-form-item style="width: 100%!important;">
                <el-button
                  type="primary"
                  @click="beforeSubmit"
                  style="background-color: #6993FF;color:#fff;float:right;"
                >{{btnText}}</el-button>
                <el-button
                  type="success"
                  @click="docsVisible = true"
                  class="files"
                >
                  ADJUNTAR ARCHIVOS
                </el-button>
              </el-form-item>
              <DocsDialog
                :docsVisible="docsVisible"
                :folder="'OFTALMOLOGÍA'"
                v-on:closeDialog="closeDialog" />
            </el-form>
          </el-main>
        </el-container>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex';
import lodash from 'lodash';
import Title2 from '../../../components/Title2';
import optionsMixin from './mixin/options';
import rulesMixin from './mixin/rules';
import formFormatsMixin from './mixin/formats';
import DocsDialog from '../../Docs/DocsDialog';

export default {
  data() {
    return {
      docsVisible: false,
      label: 'Por favor llene los datos requeridos para completar la Evaluación',
      btnText: 'REGISTRAR',
      date: false,
      evaluationId: null,
      safeForm: {},
      form: {
        reason: '',
        left: {
          anterior: {
            eyelid: '',
            eyelidComments: '',
            annexes: '',
            annexesComments: '',
            ocularGlobule: '',
            ocularGlobuleComments: '',
            ocularMotility: '',
            ocularMotilityComments: '',
            conjunctiva: '',
            conjunctivaComments: '',
            sclera: '',
            scleraComments: '',
            cornea: '',
            corneaComments: '',
            anteriorChamber: '',
            anteriorChamberComments: '',
            iris: '',
            irisComments: '',
            ginioscopy: '',
            ginioscopyComments: '',
            lens: '',
            lensComments: '',
            other: '',
          },
          posterior: {
            retina: '',
            retinaComments: '',
            vitreo: '',
            vitreoComments: '',
            cupDisc: '',
            cupDiscComments: '',
            nerve: '',
            nerveComments: '',
            macula: '',
            maculaComments: '',
            vessel: '',
            vesselComments: '',
            periphery: '',
            peripheryComments: '',
            statisticalDiagnosisHealthy: false,
            statisticalDiagnosisSquint: false,
            statisticalDiagnosisCataracts: false,
            statisticalDiagnosisGlaucoma: false,
            statisticalDiagnosisDiabeticRetinopathy: false,
            statisticalDiagnosisCornealTransplant: false,
            statisticalDiagnosisPostOperated: false,
            statisticalDiagnosisOther: false,
            diagnosis: '',
            plan: '',
          },
        },
        right: {
          anterior: {
            eyelid: '',
            eyelidComments: '',
            annexes: '',
            annexesComments: '',
            ocularGlobule: '',
            ocularGlobuleComments: '',
            ocularMotility: '',
            ocularMotilityComments: '',
            conjunctiva: '',
            conjunctivaComments: '',
            sclera: '',
            scleraComments: '',
            cornea: '',
            corneaComments: '',
            anteriorChamber: '',
            anteriorChamberComments: '',
            iris: '',
            irisComments: '',
            ginioscopy: '',
            ginioscopyComments: '',
            lens: '',
            lensComments: '',
            other: '',
          },
          posterior: {
            retina: '',
            retinaComments: '',
            vitreo: '',
            vitreoComments: '',
            cupDisc: '',
            cupDiscComments: '',
            nerve: '',
            nerveComments: '',
            macula: '',
            maculaComments: '',
            vessel: '',
            vesselComments: '',
            periphery: '',
            peripheryComments: '',
            statisticalDiagnosisHealthy: false,
            statisticalDiagnosisSquint: false,
            statisticalDiagnosisCataracts: false,
            statisticalDiagnosisGlaucoma: false,
            statisticalDiagnosisDiabeticRetinopathy: false,
            statisticalDiagnosisCornealTransplant: false,
            statisticalDiagnosisPostOperated: false,
            statisticalDiagnosisOther: false,
            diagnosis: '',
            plan: '',
          },
        },
      },
      loading: false,
      loadingService: null,
    };
  },
  mixins: [
    optionsMixin,
    rulesMixin,
    formFormatsMixin,
  ],
  components: {
    Title2,
    DocsDialog,
  },
  computed: {
    ...mapState({
      role: (state) => state.auth.user.role,
    }),
  },
  methods: {
    closeDialog() {
      this.docsVisible = false;
    },
    async getData(patientId) {
      try {
        const response = await this.axios.get(`patient/ophtha/details/${patientId}`);
        if (response.data) {
          const { data } = response;
          const formatted = this.fullGetFormat(data);
          this.form = formatted;
          this.evaluationId = data.id;
          this.btnText = this.evaluationId !== null ? 'ACTUALIZAR' : 'REGISTRAR';
          this.safeForm = JSON.parse(JSON.stringify(this.form));
        }
      } catch (error) {
        this.$errorNotify(error);
      }
    },
    isDefault(key) {
      const keys = [
        'annexes',
        'eyelid',
        'ocularGlobule',
        'ocularMotility',
        'conjunctiva',
        'sclera',
        'cornea',
        'anteriorChamber',
        'iris',
        'nerve',
      ];
      return !(keys.indexOf(key) === -1);
    },
    defaultSelected() {
      // eslint-disable-next-line
      for (const key in this.form.left.anterior) {
        if (this.isDefault(key) && !this.form.left.anterior[key]) {
          this.form.left.anterior[key] = 'Sin Padecimientos';
        }
      }
      // eslint-disable-next-line
      for (const key in this.form.right.anterior) {
        if (this.isDefault(key) && !this.form.right.anterior[key]) {
          this.form.right.anterior[key] = 'Sin Padecimientos';
        }
      }
      // eslint-disable-next-line
      for (const key in this.form.left.posterior) {
        if (this.isDefault(key) && !this.form.left.posterior[key]) {
          this.form.left.posterior[key] = 'Sin Padecimientos';
        }
      }
      // eslint-disable-next-line
      for (const key in this.form.right.posterior) {
        if (this.isDefault(key) && !this.form.right.posterior[key]) {
          this.form.right.posterior[key] = 'Sin Padecimientos';
        }
      }
    },
    beforeSubmit() {
      this.$refs.refId.validate((isValid) => {
        if (isValid) {
          this.submit();
        }
      });
    },
    getDiff(obj1 = {}, obj2 = {}, diff = [], keyMap = '') {
      Object.keys(obj1).forEach((key) => {
        if (typeof obj2[key] === 'object' && obj2[key] !== null && !Array.isArray(obj2[key])) {
          const diffR = this.getDiff(obj1[key], obj2[key], diff, `${keyMap}${key}.`);
          diff.concat(diffR);
        } else if (!lodash.isEqual(obj1[key], obj2[key])) {
          let keyMapFormatted = `${keyMap}${key}`;
          keyMapFormatted = keyMapFormatted.replace(/[0-9]$/g, '');
          keyMapFormatted = keyMapFormatted[keyMapFormatted.length - 1] === '.'
            ? keyMapFormatted.slice(0, -1) : keyMapFormatted;
          diff.push(keyMapFormatted);
        }
      });
      return diff;
    },
    async submit() {
      try {
        this.loading = true;
        const { id: patientId } = this.$route.params;
        const diff = this.getDiff(this.form, this.safeForm);
        const requests = [];
        let message = 'Se actualizó perfil oftalmológico';
        if (diff.length) {
          if (diff.some((x) => x === 'reason') || this.evaluationId === null) {
            const data = this.fullPostFormat(this.form);
            const response = await this.axios.post(`patient/ophtha/${patientId}`, data);
            message = 'Se generó evaluación oftalmológica';
            if (response) {
              await this.axios.post(`patient/changelog/${patientId}`, {
                title: 'OFTALMOLOGÍA',
                message,
              });
            }
          } else {
            if (diff.some((x) => x.split('.')[1] === 'anterior')) {
              const right = diff.some((x) => {
                const s = x.split('.');
                return s[0] === 'right' && s[1] === 'anterior';
              });
              const left = diff.some((x) => {
                const s = x.split('.');
                return s[0] === 'left' && s[1] === 'anterior';
              });
              if (right && left) {
                const data = this.postASFormat(this.form);
                const url = `patient/ophtha/anteriorsegment/${this.evaluationId}`;
                requests.push(this.axios.put(url, data));
              } else {
                if (right) {
                  const data = this.form.right.anterior;
                  const url = `patient/ophtha/anteriorsegment/single/${this.evaluationId}`;
                  requests.push(this.axios.put(url, { eyeSide: 'RIGHT', ...data }));
                }
                if (left) {
                  const data = this.form.left.anterior;
                  const url = `patient/ophtha/anteriorsegment/single/${this.evaluationId}`;
                  requests.push(this.axios.put(url, { eyeSide: 'LEFT', ...data }));
                }
              }
            }
            if (diff.some((x) => x.split('.')[1] === 'posterior')) {
              const right = diff.some((x) => {
                const s = x.split('.');
                return s[0] === 'right' && s[1] === 'posterior';
              });
              const left = diff.some((x) => {
                const s = x.split('.');
                return s[0] === 'left' && s[1] === 'posterior';
              });
              if (right && left) {
                const data = this.postPSFormat(this.form);
                const url = `patient/ophtha/posteriorsegment/${this.evaluationId}`;
                requests.push(this.axios.put(url, data));
              } else {
                if (right) {
                  const data = this.form.right.posterior;
                  const url = `patient/ophtha/posteriorsegment/single/${this.evaluationId}`;
                  requests.push(this.axios.put(url, {
                    ...data,
                    eyeSide: 'RIGHT',
                  }));
                }
                if (left) {
                  const data = this.form.left.posterior;
                  const url = `patient/ophtha/posteriorsegment/single/${this.evaluationId}`;
                  requests.push(this.axios.put(url, {
                    ...data,
                    eyeSide: 'LEFT',
                  }));
                }
              }
            }
            const response = await Promise.all(requests);
            if (response.length) {
              await this.axios.post(`patient/changelog/${patientId}`, {
                title: 'OFTALMOLOGÍA',
                message,
              });
            }
          }
        }
        this.$notify({
          type: 'success',
          title: '¡Éxito!',
          message,
        });
        this.loading = false;
        setTimeout(() => {
          const path = this.date ? `/admin/appointments/subsequent/${patientId}` : '/';
          this.$router.replace({ path });
        });
      } catch (error) {
        this.loading = false;
        this.$errorNotify(error);
      }
    },
    async checkPatient(id) {
      try {
        const response = await this.axios.get(`patient/check-id/${id}`);
        return response.status === 204;
      } catch (error) {
        return false;
      }
    },
  },
  async created() {
    const { id } = this.$route.params;
    const isValid = await this.checkPatient(id);
    this.loading = true;
    if (!isValid) {
      this.$notify({
        type: 'warning',
        title: 'Error.',
        message: 'Parámetro no válido.',
        timeout: 2000,
      });
      this.$router.replace({ path: '/' });
    } else {
      await this.getData(id);
    }
    this.defaultSelected();
    this.loading = false;
  },
  watch: {
    loading(val) {
      if (val && !this.loadingService) {
        this.loadingService = this.$loading({
          fullscreen: true,
          lock: true,
          text: 'Cargando',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
        });
      } else if (this.loadingService) {
        this.loadingService.close();
        this.loadingService = null;
      }
    },
  },
};
</script>
<style lang="scss">
@import './styles/style.scss';
</style>
<style lang="scss" scoped>
@import './styles/style-scoped.scss';
</style>
