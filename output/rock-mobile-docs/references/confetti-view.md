> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Confetti View

# Confetti View

# Overview

![<br>](https://img.shields.io/badge/M-v8.0-ee7725?style=flat)

*Inherits from [SKConfettiView](https://mono.github.io/SkiaSharp.Extended/api/ui-forms/skconfettiview.html)*

Confetti View is a creative animation view designed to bring moments of celebration to life in your mobile app. Built using SkiaSharp, it delivers smooth and dynamic confetti effects—perfect for delighting users when they complete a task, unlock an achievement, or reach a milestone.

With full customization, you can control the shape, color, speed, and style of the confetti to match your brand’s look and feel. Whether it’s a quick sparkle or a full-on celebration, Confetti View makes every moment feel special.

# Properties

| Property | Type | Description |
| --- | --- | --- |
| IsAnimationEnabled | bool | Determines whether the control will play the animation provided. |
| Systems | List<ConfettiSystem> | This is provided directly as the content of the ConfettiView |

# Confetti View Types

## ConfettiSystem

Defines a set of confetti system with properties such as color, shape, emitter type...

| Property | Type | Description |
| --- | --- | --- |
| Emitter | string | Burst, Infinite, Stream |
| Position | string | Top, Left, Right, Bottom, Center |
| Physics | List<ConfettiSystemPhysic> | A list of physic to include in the confetti system. |
| Colors | string | A list of colors to include in the confetti system. |
| Shapes | string | Square, Circle, Heart, Star or Rectangle |
| StartAngle | double | The angle (in degrees) to form the start of the emission region. |
| EndAngle | double | The angle (in degrees) to form the end of the emission region. |
| MinimumInitialVelocity | double | The minimum initial velocity of the confetti particles. |
| MaximumInitialVelocity | double | The maximum initial velocity of the confetti particles. |
| MinimumRotationVelocity | double | The minimum initial rotation velocity of the confetti particles. |
| MaximumRotationVelocity | double | The maximum initial rotation velocity of the confetti particles. |
| MaximumVelocity | double | The maximum velocity the confetti particle can reach. |
| FadeOut | bool | Whether or not the particle should fade out at the end of its life. |
| LifeTime | double | The duration in seconds for how long the particle is allowed to live. |
| IsAnimationEnabled | bool | Controls whether the system is running or not. |
| IsComplete | bool | A value that indicates whether the system is complete and all systems and particles are also complete. |
| Gravity | Point | TBD |
| CustomEmitter | Rock:ConfettiSystemEmitter | Allows you to specify a custom emitter with the Rock:ConfettiSystemEmitter properties. |

## ConfettiSystemEmitter

You can also define a custom emitter behavior . 

| Property | Type | Description |
| --- | --- | --- |
| ParticleRate | int | The number of particles to generate each second. |
| MaxParticles | int | The maximum number of particles allowed by the emitter. A value of -1 indicates no limit. |
| Duration | double | The duration in seconds of how long the emitter runs for. A value of 0 indicates that all particles are emitted instantly. |

## ConfettiSystemPhysic

You can also define a custom emitter behavior.

| Property | Type | Description |
| --- | --- | --- |
| Size | double | The physical size of the particle rendered. |
| Mass | double | The mass of the particle which resists the force of gravity. Meaning the higher the value the lighter it is. |

## Examples

```xaml
<Grid Rock:Zone.Expands="true">

    <Rock:ConfettiView x:Name="confetti"
                IsAnimationEnabled="true">
        <Rock:ConfettiSystem Colors="Red, White, Blue"
            Emitter="Infinite"
            Shapes="rectangle, circle, star"
            Position="Center" />
    </Rock:ConfettiView>
    
</Grid>
```

If you wish to do so, you can customize a lot more

```xaml
<Grid Rock:Zone.Expands="true">

    <Rock:ConfettiView x:Name="confetti">
    
        <Rock:ConfettiSystem Colors="Red, White, Blue"
            Emitter="Burst"
            Shapes="rectangle, hexagon"
            Position="center"
            LifeTime="5.0"
            StartAngle="325"
            EndAngle="350"
            MinimumInitialVelocity="100"
            MaximumInitialVelocity="600">
            
            <Rock:ConfettiSystem.EmitterPosition>
                <Rock:EmitterPositionPoint X="300" Y="400" />
            </Rock:ConfettiSystem.EmitterPosition>
            
            <Rock:ConfettiSystem.Physics>
                <Rock:ConfettiSystemPhysic Size="12" Mass="1.2" />
                <Rock:ConfettiSystemPhysic Size="16" Mass="1.2" />
            </Rock:ConfettiSystem.Physics>

            <Rock:ConfettiSystem.CustomEmitter>
              <Rock:ConfettiSystemEmitter ParticleRate="300"
                MaxParticles="300"
                Duration="0" />
            </Rock:ConfettiSystem.CustomEmitter>
        </Rock:ConfettiSystem>
       
   </Rock:ConfettiView>
 
</Grid>
```

You can also have multiple system within the view

```xaml
Grid Rock:Zone.Expands="true">

    <Rock:ConfettiView x:Name="confetti">
    
        <!-- First System -->
        <Rock:ConfettiSystem Colors="Red, White, Blue"
            Emitter="Infinite"
            Shapes="rectangle, circle, star"
            Position="Center" />
            
        <!-- Second System -->
        <Rock:ConfettiSystem Colors="Red, White, Blue"
            Emitter="Burst"
            Shapes="rectangle, hexagon"
            Position="center"
            LifeTime="5.0"
            StartAngle="325"
            EndAngle="350"
            MinimumInitialVelocity="100"
            MaximumInitialVelocity="600">
            
            <Rock:ConfettiSystem.EmitterPosition>
                <Rock:EmitterPositionPoint X="300" Y="400" />
            </Rock:ConfettiSystem.EmitterPosition>
            
            <Rock:ConfettiSystem.Physics>
                <Rock:ConfettiSystemPhysic Size="12" Mass="1.2" />
                <Rock:ConfettiSystemPhysic Size="16" Mass="1.2" />
            </Rock:ConfettiSystem.Physics>

            <Rock:ConfettiSystem.CustomEmitter>
              <Rock:ConfettiSystemEmitter ParticleRate="300"
                MaxParticles="300"
                Duration="0" />
            </Rock:ConfettiSystem.CustomEmitter>
        </Rock:ConfettiSystem>
       
   </Rock:ConfettiView>
 
</Grid>
```
