import React from 'react'
import { Link } from "react-router-dom";


function videos(a){
    
    ('div a').click(function(a) {
          //e.preventDefault();
          var $this = (this);
          this.closest('ul').find('div.active,a.active').removeClass('active');
          this.addClass('active');
          this.parent().addClass('active');
    
      });
      
    }
    
    export const Menucompra = () => {



    return (
        <div>


            <nav className="nav nav-tabs nav-justified"  >
                <a className="nav-item nav-link "   href="/Compra">Datos Facturación</a>
                <a className="nav-item nav-link"  href="/Envio"   >Elegir envío</a>
                <a className="nav-item nav-link " href="/Pago">Realizar Pago</a>
                <a className="nav-item nav-link " href="/Confirmarcompra">Confirmar Compra</a>

            </nav>

            </div>
            )
            }