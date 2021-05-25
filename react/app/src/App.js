import React from 'react'
import _, { random } from 'lodash'

import logo from './logo.svg'
import './App.css'

//data
import drawingsSeeds from './drawingsSeeds'
import drawingsSaved from './drawingsSaved'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.prepareDrawings=this.prepareDrawings.bind(this)
    this.generate=this.generate.bind(this)
    this.findDuplicates=this.setDuplicates.bind(this)
    this.export=this.export.bind(this)
    this.state = {
      drawingsSeeds: this.prepareDrawings(drawingsSeeds),
      drawingsSaved: this.prepareDrawings(drawingsSaved)
    }
  }
  componentDidMount() {
    //this.setState({drawings: this.prepareDrawings(inputRawDrawings)})
  }
 
  generate(drawingsNr, groupId, fixedNrsOfFive=[], fixedNrsOfSupers=[]) {
    const seeds = this.state.drawingsSeeds.filter(dr=>dr.group==groupId)
    const randomUnique = (range, count, fixedNrs) => {
      let nums = new Set([...fixedNrs])
      while (nums.size < count) {
          nums.add(Math.floor(Math.random() * (range - 1 + 1) + 1))
      }
      return _.sortBy([...nums], (x)=>parseInt(x))
    }
    const newDrawings = new Set()
    let seedIndex = 0
    while (newDrawings.size < drawingsNr) {
      //const seedIndex = _.random(seeds.length)
      const seedDr = seeds[seedIndex]
      const fives =  seedDr ? seedDr.fives.sort().join(' ') : randomUnique(50, 5, fixedNrsOfFive).sort().join(' ')
      const supers = seedDr ? seedDr.supers.sort().join(' ') :randomUnique(10, 2, fixedNrsOfSupers).sort().join(' ')
      if (newDrawings.add(fives+' '+supers+':'+(seedDr?'seed '+seedIndex :'gen')))
        seedIndex++
    }
    const nrs = this.prepareDrawings({[groupId]: [...newDrawings].join('\n')})
    return nrs
  }
  prepareDrawings(rawDrawings) {
    const getNrs = (splts) => {
      if (splts.length==1) return splts[0]
      if (splts.length==2) {
        if (splts[0].indexOf('.')>-1)
          return splts[1]
        else
          return splts[0]
      }
    }
    const getDate = (splts) => {
      return _.find(splts, (s)=>s.indexOf('.')>-1)||''
    } 
    const getOrig = (splts) => {
      return _.find(splts, (s)=>(s.indexOf('seed')>-1||s.indexOf('gen')>-1))||''
    } 
    
    const prepareDrawLine = (d, grK, index) => {
      const splts = d.trim().split(':')
      const nrs = getNrs(splts).trim().split(' ').filter(x=>x.length)
      const fives = _.sortBy(_.slice(nrs, 0,5).map(x=>parseInt(x)), (x)=>parseInt(x))
      const supers = _.sortBy(_.slice(nrs, 5,7).map(x=>parseInt(x)), (x)=>parseInt(x))
      const date = getDate(splts)
      const orig = getOrig(splts)
      const er = nrs.length!=7 ? {errors: 'wrong draw:'+nrs} : ''
      return {fives: fives, supers: supers, group: grK, date: date, index: index+1, orig: orig , ...er}
    }
    
    let all = []
    Object.keys(rawDrawings).forEach(grK=>{         
      const drawGr = rawDrawings[grK].trim().split("\n")       
      const drs = drawGr.filter(d=>d.length).map((d, i)=>prepareDrawLine(d, grK, i))
      all=all.concat(drs)
    })      
    const sorted = _.sortBy(all, (e)=>[e.fives[0],e.fives[1]])
    return sorted
  }

  setDuplicates(genDrawings) {
    const combined = _.concat(genDrawings, this.state.drawingsSaved)
    for (let i = 0; i < combined.length-1; i++) {
      for (let j = i+1; j < combined.length; j++) {
        const dri = combined[i]
        const drj = combined[j]
        if (_.isEqual(_.take(dri.fives, 5), _.take(drj.fives, 5))) {
          dri.duplicates = (dri.duplicates || new Set())
          dri.duplicates.add(drj) //use Set because Hot load while dev triggers render several times
        }
      }
    }
  }

  export(drawingsGrouped) {
    const groups = _.keys(drawingsGrouped).join('       ')
    const drawings = [] 
    _.keys(drawingsGrouped).forEach((gr)=>{
        const drs = drawingsGrouped[gr]
        drawings.push(drs.map((dr)=>dr.fives.join(' ')))
      }) 
    console.log(`
    ${groups}
    ${drawings.join('       ')}
    `)
  }

  render() {
    if (!this.state.drawingsSeeds)
      return ""
    
    const genDescriptors = [
      {group: "mokhtar.04.6.2021", count: 23, fixedOfFive: [], fixedOfTwo: []}
    ]
    const generated = _.flatten(genDescriptors.map((desc)=>{
      return this.generate(desc.count, desc.group, desc.fixedOfFive, desc.fixedOfTwo)
    }))
    this.setDuplicates(generated)
    const duplicates = generated.filter(dr=>(dr.duplicates && dr.duplicates.size)).map((dr, i)=><Drawing key={i} {...dr} />)
    const drawingsGrouped = _.groupBy(generated, 'group')
    const drawingsGroupedRender = _.keys(drawingsGrouped).map((gk, i)=>{
      const grDrawingsRender = drawingsGrouped[gk].map((dr, j)=>{
        return <Drawing key={j} {...dr} />
      })
      const errors = drawingsGrouped[gk].filter(dr=>(dr.errors && dr.errors.length))
      return <div className='drawingsGroup' key={i}>
         <div>{gk}{' '}</div  >
         <div>(errors: {errors.length})</div>
         <div>{grDrawingsRender}</div>
      </div>
    })

    const drawingsSavedGrouped = _.groupBy(this.state.drawingsSaved, 'group')
    const drawingsSavedGroupedRender = _.keys(drawingsSavedGrouped).map((gk, i)=>{
      const grDrawingsRender = drawingsSavedGrouped[gk].map((dr, j)=>{
        return <Drawing key={j} {...dr} />
      })
      const errors = drawingsSavedGrouped[gk].filter(dr=>(dr.errors && dr.errors.length))
      return <div className='drawingsGroup' key={i}>
        <div>{gk}{' '}</div  >
        <div>(errors: {errors.length})</div>
        <div>{grDrawingsRender}</div>
      </div>
    })
    return (
      <div className="App">
        <header className="App-header">Lotto</header>
        <button onClick={()=>this.export(drawingsGrouped)}>export</button>
          <div className='fbx r'>
            {drawingsGroupedRender}
            <div className='drawingsGroup'>
              <div>Duplicates({duplicates.length})</div>
              <div></div>
              <div>{duplicates}</div>
            </div>
          </div>
          {/* <div className='fbx c'>
          <header className="App-header">Previous Saved {this.state.drawingsSaved.length}</header>
            <div className='fbx r'>
              {drawingsSavedGroupedRender}
            </div>
          </div> */}
      </div>
    )
  }
}

export default App


const Drawing = (props) => {
  const fives = props.fives.map((n1,x1)=><span className='num' key={x1}>{n1}</span>)
  const supers = props.supers.map((n1,x1)=><span className='num' key={x1}>{n1}</span>)
  const duplicates = (props.duplicates && props.duplicates.size) ? [...props.duplicates] : []
  const duplics = (duplicates && duplicates.length) ? 
  <div>
    <div>In {props.group}</div>
    {duplicates.map(dp=>{
      return <div>
        <div>and</div> 
        <div>{dp.group + '(' + dp.fives + ' ' + dp.supers  + ') ' + dp.index}</div>
      </div>
    }) }
  </div>
  : ''
  const date = _.includes(props.date, '.') ? ':'+props.date : ''
  const errors = props.errors ? props.errors : ''
  const notes = `${date+errors}`
  return <div className={'fbx c drawing ' + (props.orig?props.orig:'')}>
      <div title={notes} className={'fbx ' + (props.errors ? ' error ' : '')} ><span className='drs fives'>{fives}</span>{' '}<span className='drs super2s'>{supers}</span>
        {/* <div className='small'>{props.index}</div> */}
      </div>
      {duplics}
  </div>
}