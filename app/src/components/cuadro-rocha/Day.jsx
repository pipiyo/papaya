import React, { Component } from 'react'

class Day extends Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div>

          <div class="info title-proyecto">
            <div class="datos name none"><p></p></div>
            <div class="datos date"><p></p></div>
            <div class="datos date"><p></p></div>
            <div class="datos percentage"><p></p></div>

            {
                this.props.obj.map( (calendario, i) => {
                    return( <div key={i} class="mes">
                                <p>{calendario}</p>
                            </div>  )
                })
            }



         </div>

          <div class="info title-proyecto">
            <div class="datos name none"><p>Información</p></div>
            <div class="datos date"><p>Fecha I</p></div>
            <div class="datos date"><p>Fecha E</p></div>
            <div class="datos percentage"><p>%</p></div>

            <div class="day"><p>1</p></div>
            <div class="day"><p>2</p></div>
            <div class="day"><p>3</p></div>
            <div class="day"><p>4</p></div>
            <div class="day"><p>5</p></div>
            <div class="day"><p>6</p></div>
            <div class="day"><p>7</p></div>
            <div class="day"><p>8</p></div>
            <div class="day"><p>9</p></div>
            <div class="day"><p>10</p></div>
            <div class="day"><p>11</p></div>
            <div class="day"><p>12</p></div>
            <div class="day"><p>13</p></div>
            <div class="day"><p>14</p></div>
            <div class="day"><p>15</p></div>
            <div class="day"><p>16</p></div>
            <div class="day"><p>17</p></div>
            <div class="day"><p>18</p></div>
            <div class="day"><p>19</p></div>
            <div class="day"><p>20</p></div>
            <div class="day"><p>21</p></div>
            <div class="day"><p>22</p></div>
            <div class="day"><p>23</p></div>
            <div class="day"><p>24</p></div>
            <div class="day"><p>25</p></div>
            <div class="day"><p>26</p></div>
            <div class="day"><p>27</p></div>
            <div class="day"><p>28</p></div>
            <div class="day"><p>29</p></div>
            <div class="day"><p>30</p></div>
            <div class="day"><p>31</p></div>
            <div class="day"><p>1</p></div>
            <div class="day"><p>2</p></div>
            <div class="day"><p>3</p></div>
            <div class="day"><p>4</p></div>


          </div>
        </div>
      )

  }

}

export default Day